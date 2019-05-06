package come.game.main;
"esversion" : 6;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;
public class Boss3 extends GameObject{
        private Handler handler;
        public Boss3(int x, int y, ID id, Handler handler){
                super(x,y,id);
                this.handler = handler;
                velX = 3;
                velY = 8;
        }
        public Rectangle getBounds(){
                return new Rectangle((int) x,(int) y, 116, 116);
        }
        public void tick(){
                x += velX;
                y += velY;     
                if(y <= 0 || y >= Game.HEIGHT - 96) velY *= -1;
                if(x <= 0 || x >= Game.WIDTH - 96) velX *= -1;
                handler.addObject(new Trail((int)x,(int) y, ID.Trail, Color.yellow, 116, 116, 0.02f,handler));
        }
        public void render(Graphics g){
                g.setColor(Color.yellow);
                g.fillRect((int)x,(int)y,116,116);
        }
}// JavaScript Document