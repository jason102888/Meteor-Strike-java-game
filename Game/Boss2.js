package come.game.main;

"esversion" : 6;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.util.Random;
public class Boss2 extends GameObject{
        private Handler handler;
        Random r = new Random();
        
        private int timer =100;
        private int timer2=50;
        public Boss2(int x, int y, ID id, Handler handler){
                super(x,y,id);
                this.handler = handler;
                velX = 2;
                velY = 0;
        }
        public Rectangle getBounds(){
                return new Rectangle((int) x,(int) y, 96, 96);
        }
        public void tick(){
                x += velX;
                y += velY;
                if(timer<=0)velY=0;
                else timer--;
                
                if(timer<=0) timer2--;
                if(timer2<=0) {
                	if(velY==0) velY=2;
                	   if(velY > 0)
                       	velY += 0.005f;
                       else if(velY < 0)
                       	velY -= 0.005f;
                	   
                	   velY = Game.clamp(velY, -10, 10);
                	int spawn = r.nextInt(10);
                	if(spawn==0)handler.addObject(new EnemyBossBullet((int)x+48,(int)y+48,ID.Boss2Bullet, handler));
                }
               if(y <= 0 || y >= Game.HEIGHT - 96) velY *= -1;
               // if(x <= 0 || x >= Game.WIDTH - 96) velX *= -1;
               // handler.addObject(new Trail((int)x,(int) y, ID.Trail, Color.blue, 96, 96, 0.008f,handler));
        }
        public void render(Graphics g){
                g.setColor(Color.green);
                g.fillRect((int)x,(int)y,96,96);
        }
}// JavaScript Document