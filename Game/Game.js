package come.game.main;
"esversion" : 6;
import java.applet.Applet;
import java.awt.Canvas;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferStrategy;
import java.util.Random;

public class Game extends Applet implements Runnable {
        private static final long serialVersionUID = 1550691097823471818L;
        public static final int WIDTH = 640, HEIGHT = WIDTH / 12 * 9;
        private Thread thread;
        private boolean running = false;
        public int diff=0;
        //0=normal
        //1=hard
        public static boolean paused = false;
        private Random r;
        private Handler handler;
        private HUD hud;
        private Spawn spawner;
        private Menu menu;
        //game states
        public enum STATE {
        	Menu,
        	Select,
        	Help,
        	Game,
        	Shop,
        	End
        };
        //initiate the menu
        public static STATE gameState = STATE.Menu;
        //load the game
        public Game(){
                handler = new Handler();
                hud = new HUD();
                menu = new Menu(this, handler, hud);
                this.addKeyListener(new KeyInput(handler, this));
                this.addMouseListener(menu);
                AudioPlayer.load();
                AudioPlayer.getMusic("music").loop();
                new Window(WIDTH,HEIGHT,"Meteor Strike", this);
              
                spawner = new Spawn(handler, hud, this);

                r = new Random();
                if(gameState == STATE.Game)
                {
                handler.addObject(new Player(WIDTH/2-32, HEIGHT/2-32, ID.Player, handler));
                
                handler.addObject(new BasicEnemy(r.nextInt(Game.WIDTH), r.nextInt(Game.HEIGHT), ID.BasicEnemy, handler));
                }else {
                for(int i =0; i<15;i++)	{
                	 handler.addObject(new MenuParticle(r.nextInt(Game.WIDTH),r.nextInt(Game.WIDTH), ID.MenuParticle, handler));
                }
                }
        }
        //checks if game is running
        public synchronized void start(){
                thread = new Thread(this);
                thread.start();
                running = true;
        }
        // checks if game is stopped
        public synchronized void stop(){
                try{
                        thread.join();
                        running = false;
                }catch(Exception e){
                        e.printStackTrace();
                }
        }
        //basic game loop
        public void run(){
                this.requestFocus();
                long lastTime = System.nanoTime();
                double amountOfTicks = 60.0;
                double ns = 1000000000 / amountOfTicks;
                double delta = 0;
                long timer = System.currentTimeMillis();
                int frames = 0;
                while(running){
                        long now = System.nanoTime();
                        delta += (now - lastTime) / ns;
                        lastTime = now;
                        while(delta >= 1){
                                tick();
                                delta--;
                        }
                        if(running)
                                render();
                        frames++;
                        if(System.currentTimeMillis() - timer > 1000){
                                timer += 1000;
                                System.out.println("FPS: " + frames);
                                frames = 0;
                        }
                }
                stop();
        }
        private void tick(){
              
                
                if(!paused) {
                if(gameState == STATE.Game) {
                	  
                	 hud.tick();
                     spawner.tick();
                     handler.tick();
                     if(HUD.HEALTH<=0) {
                    	 HUD.HEALTH=100;
                    	
                    	 gameState = STATE.End;
                    	 handler.clearEnemys();
                    	 for(int i =0; i<15;i++)	{
                        	 handler.addObject(new MenuParticle(r.nextInt(Game.WIDTH),r.nextInt(Game.WIDTH), ID.MenuParticle, handler));
                        }
                     }
                
                }else if(gameState == STATE.Menu || gameState==STATE.End || gameState==STATE.Select) {
                	menu.tick();
                	 handler.tick();
                }
               
        }}
        //draws the game
        private void render(){
                BufferStrategy bs = this.getBufferStrategy();
                if(bs == null){
                        this.createBufferStrategy(3);
                        return;
                }      
                Graphics g = bs.getDrawGraphics();
                g.setColor(Color.black);
                g.fillRect(0, 0, WIDTH, HEIGHT);
                handler.render(g);
                if(paused) {
                	g.drawString("PAUSED", 100, 100);
                }
                if(gameState == STATE.Game) {  
                	hud.render(g);
                	}else if(gameState == STATE.Menu || gameState == STATE.Help || gameState==STATE.End || gameState==STATE.Select) {
                    	menu.render(g);
                    }
             
                g.dispose();
                bs.show();
        }
        //sets boundries
        public static float clamp(float var, float min, float max){
                if(var >= max)
                        return var = max;
                else if(var < min)
                        return var = min;
                else
                        return var;
        }
        public static void main(String args[]){
                        new Game();
        }
}

// JavaScript Document