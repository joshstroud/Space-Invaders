# Galaxian Clone

## **Overview**

Galaxian is a remake of one of the most popular games of all time: Space Invaders. Galaxian is slightly more sophisticated and includes moving enemies that shoot at the player.

I plan to make a clone of the game from scratch in Javascript with faithful color graphics.

![Galaxian](https://github.com/joshstroud/GalaxianClone/blob/master/docs/galaxian-screenshot.png?raw=true "Galaxian Screenshot")

[View Galaxian gameplay video](https://youtu.be/XhYVcwhSWjI?t=60)

The player is a ship at the bottom of the screen. The player shoots at an invading grid of aliens descending from the top of the screen. Aliens will move and chase the player as well as fire bullets. The player wins when all the aliens are destroyed. The player loses a life when an alien or a bullet touches the player.

## **Functionality**

- Basic animated visuals and keyboard interaction.
- Players can use arrow keys to move a ship left/right.
- Players can fire bullets at aliens to destroy them.
- Aliens chase the player and fire bullets.
- Faithful sprites from original game
- Collision detection between all relevant objects
- First level is implemented.

The game page will consist of the game frame with a play and mute button.

Upon pressing play the game starts.

Upon 'Game Over' a modal will appear, offering the player to play again.

## **Technologies employed**

- Vanilla JavaScript for game logic.
- HTML5 Canvas for rendering.
- Webpack to bundle various scripts into a single source.
- React.js for basic page structure and functionality.

## **Main files**

- `game.js` main structure of the canvas and center of game logic.
- `environment.js` responsible for rendering the space environment as well as UI elements.
- `player.js` handles ship rendering and logic, and accepts player input.
- `alien.js` handles aliens rendering and logic
- `bullet.js`handles bullet rendering and logic for both players and aliens

**Development timeline**

#####

**Day 1:**

1.  Review resources on how to create games using Canvas.
1.  Complete basic page skeleton and functionality.
1.  Complete environment rendering.

#####

**Day 2:**

1.  Complete player avatar rendering and functionality.
1.  Start alien rendering and functionality

#####

**Day 3:**

1.  Implement object collision detection and handling.
1.  Finish game over condition.

#####

**Day 4:**

1.  Polish game style and fix bugs.
1.  Style web page.

#####

**Day 5:**

1.  Implement bonus features.

###

## **Bonus features**

- Multiple levels
- More enemy types
- Power ups
  - More bullet patterns
  - Shields
  - Player speed increase

<!-- GD2md-html version 1.0β13 -->
