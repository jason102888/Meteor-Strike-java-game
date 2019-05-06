package come.game.main;
"esversion" : 6;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.Random;

import come.game.main.Game.STATE;

public class Menu extends MouseAdapter{
	
	private Game game;
	private Handler handler;
	private HUD hud;
	private Random r = new Random();
	
	public Menu(Game game, Handler handler, HUD hud) {
		this.game = game;
		this.handler = handler;
		this.hud = hud;
	}
	
	public void mousePressed(MouseEvent e) {
		//variable for mouse x and y
		int mx = e.getX();
		int my = e.getY();
		 if(game.gameState ==STATE.Menu) {
		//play button
		if(mouseOver(mx, my, 210, 150, 200, 64)) {
		
		game.gameState =STATE.Select;
             AudioPlayer.getSound("menu_sound").play();
             return;
		}
		//help button
		if(mouseOver(mx, my, 210, 250, 200, 64)) {
			game.gameState = STATE.Help;
			 AudioPlayer.getSound("menu_sound").play();
		} 
	
		//quit button
		if(mouseOver(mx, my, 210, 350, 200, 64)) {
			game.gameState = STATE.Menu;
			 AudioPlayer.getSound("menu_sound").play();
			}
		 }	 if(game.gameState == STATE.Select) {
				//Normal button
				if(mouseOver(mx, my, 210, 150, 200, 64)) {
					game.gameState = STATE.Game;
					 handler.addObject(new Player(Game.WIDTH/2-32, Game.HEIGHT/2-32, ID.Player, handler));
					handler.clearEnemys();
		             handler.addObject(new BasicEnemy(r.nextInt(Game.WIDTH), r.nextInt(Game.HEIGHT), ID.BasicEnemy, handler));
				game.diff=0;
		             AudioPlayer.getSound("menu_sound").play();
				}
				//hard button
				if(mouseOver(mx, my, 210, 250, 200, 64)) {
					game.gameState = STATE.Game;
					 handler.addObject(new Player(Game.WIDTH/2-32, Game.HEIGHT/2-32, ID.Player, handler));
					handler.clearEnemys();
		             handler.addObject(new HardEnemy(r.nextInt(Game.WIDTH), r.nextInt(Game.HEIGHT), ID.BasicEnemy, handler));
				game.diff=1;
		             AudioPlayer.getSound("menu_sound").play();
				} //back button
				if(mouseOver(mx, my, 210, 350, 200, 64)) {
					game.gameState= STATE.Menu;
					 AudioPlayer.getSound("menu_sound").play();
					}
				//quit button
				 }	if(mouseOver(mx, my, 210, 390, 200, 64)) {
						System.exit(1);
						
						}	
		//back button for help
		 if(game.gameState == STATE.Help) {
			if(mouseOver(mx, my, 210, 350, 200, 64)) {
				game.gameState= STATE.Menu;
				 AudioPlayer.getSound("menu_sound").play();
			}
		}	//Try again button for help
		 if(game.gameState == STATE.End) {
				if(mouseOver(mx, my, 210, 350, 200, 64)) {
					game.gameState= STATE.Menu;
					 hud.setLevel(1);
                	 hud.setScore(0);
					// handler.addObject(new Player(Game.WIDTH/2-32, Game.HEIGHT/2-32, ID.Player, handler));
					//	handler.clearEnemys();
			           //  handler.addObject(new BasicEnemy(r.nextInt(Game.WIDTH), r.nextInt(Game.HEIGHT), ID.BasicEnemy, handler));
				}
			}
	}	
	public void mouseReleased(MouseEvent e) {
		
	}
	
	private boolean mouseOver(int mx, int my, int x, int y, int width, int height) {
		//if mouse x greater than x plus width and Y plus height it is inside the box
		if(mx > x && mx < x + width) {
			if(my > y && my < y + height) {
				return true;
			}else return false;
		}else return false;
	}
	
	public void tick() {
		
	}
	
	public void render(Graphics g) {
		if(game.gameState == STATE.Menu) {
		Font fnt=new Font("arial", 1, 50);
		Font fnt2=new Font("arial", 1, 30);
		
		g.setFont(fnt);
		g.setColor(Color.white);
		g.drawString("Meteor Strike", 180, 70);
		g.setColor(Color.white);
		g.drawRect(220, 150, 200, 64);
		g.setFont(fnt2);
		g.drawString("Play", 270, 190);
		g.setColor(Color.white);
		g.drawRect(220, 250, 200, 64);
		g.setFont(fnt2);
		g.drawString("Help", 270, 290);
		g.setColor(Color.white);
		g.drawRect(220, 350, 200, 64);
		g.setFont(fnt2);
		g.drawString("Quit", 270, 390);
	}else if(game.gameState ==STATE.Help) {
		Font fnt=new Font("arial", 1, 50);
		Font fnt2=new Font("arial", 1, 30);
		Font fnt3=new Font("arial", 1, 20);
		g.setFont(fnt);
		g.setColor(Color.white);
		g.drawString("Help!", 240, 70);
		g.setFont(fnt3);
		g.drawString("Use WASD keys to move player and dodge enemies!", 50, 200);
		g.setFont(fnt2);
		g.drawRect(220, 350, 200, 64);
		g.drawString("Back", 270, 390);
	}else if(game.gameState ==STATE.End) {
		Font fnt=new Font("arial", 1, 50);
		Font fnt2=new Font("arial", 1, 30);
		Font fnt3=new Font("arial", 1, 20);
		g.setFont(fnt);
		g.setColor(Color.white);
		g.drawString("Game Over!", 180, 70);
		g.setFont(fnt3);
		g.drawString("You Lost with a score of: "+ hud.getScore()+"!", 175, 200);
		g.setFont(fnt2);
		g.drawRect(220, 350, 200, 64);
		g.drawString("Try Again", 245, 390);
	}	else if(game.gameState == STATE.Select) {
		Font fnt=new Font("arial", 1, 50);
		Font fnt2=new Font("arial", 1, 30);
		
		g.setFont(fnt);
		g.setColor(Color.white);
		g.drawString("SELECT DIFFICULTY", 90, 70);
		g.setColor(Color.white);
		g.drawRect(220, 150, 200, 64);
		g.setFont(fnt2);
		g.drawString("Normal", 270, 190);
		g.setColor(Color.white);
		g.drawRect(220, 250, 200, 64);
		g.setFont(fnt2);
		g.drawString("Hard", 270, 290);
		g.setColor(Color.white);
		g.drawRect(220, 350, 200, 64);
		g.setFont(fnt2);
		g.drawString("Back", 270, 390);
}
	}}
// JavaScript Document