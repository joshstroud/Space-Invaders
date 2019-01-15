# Galaxian Clone

## **Overview**

Galaxy is a remake of one of the most popular games of all time: Space Invaders. Save Earth from the invading aliens in this classic space shooter.

Play the live game.

![Galaxian](https://github.com/joshstroud/Galaxy/blob/master/docs/playthrough.gif?raw=true "Galaxian Playthrough")

## **Technologies**

- HTML5
- CSS
- Vanilla Javascript
- HTML5 Canvas API (graphics)
- Howler JS (sound library)

## **Features**

- Retro sounds and graphics
- Custom game engine that handles physics, animations, and game logic
- Fun and addictive gameplay

## **Project Highlights**

### Game Engine

This project uses a game engine designed and built from scratch. The game engine handles physics, collision detection, rendering animations via sprites, sounds, and game logic.

The heart of the game engine is the update method, which is called once per animation frame to update the game state, render graphics, and update the physics engine.

```js
update() {
    this.checkGameOver();

    if (this.player && !this.player.dying) {
      this.handlePlayerMovement();
      this.handleSpacePress();
    }
    let now = Date.now();
    let dt = (now - this.lastTime);

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      entity.update(dt);

      this.checkCollisions();
    }

    this.canvasController.render();
    this.lastTime = now;
    window.requestAnimationFrame(this.update.bind(this))
  }
```

## Modular Object-Oriented Design

To implement the physics engine, the game defines an entity object which handles the core physics and rendering logic. Enemies, the player, and lasers all extend this entity object. The engine calls update on each entity to update the entity's physics and animations.

```js
class Entity {
  update(dt) {
    const newX = this.position.x + this.direction.x / dt;
    const newY = this.position.y + this.direction.y / dt;
    this.position = new Vector2d(newX, newY);

    if (this.sprite) {
      this.sprite.updatePos(this.position);
      this.sprite.update(dt);
    }
  }
}
```

## Animation using the HTML5 Canvas API

A simple canvas controller class handles rendering of graphics and animations for each object. This approach abstracts away animation logic from game logic, similar to the MVC design pattern.

```js
class canvasController {
  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.render(this.context);

    for (let i = 0; i < this.game.entities.length; i++) {
      let entity = this.game.entities[i];

      entity.render(this.context);
    }

    for (let i = 0; i < this.game.uiElements.length; i++) {
      let uiElement = this.game.uiElements[i];
      uiElement.render(this.context);
    }
  }
}
```

## **Future features**

- Multiple levels
- More enemy types
- Power ups
  - More bullet patterns
  - Shields
  - Player speed increase
