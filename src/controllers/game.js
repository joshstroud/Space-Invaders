import Enemy from "../entities/enemy"
import Player from "../entities/player"
import CanvasController from "../controllers/canvas_controller"
import Vector2d from "../util/vector";
import {
  ENEMY_BULLET_TYPE,
  PLAYER_BULLET_TYPE,
  Bullet
} from "../entities/bullet"
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from "../util/constants"

class Game {
  constructor() {
    this.entities = [];
    this.enemies = [];
    this.bullets = [];
    this.player = null;
    this.gameRect
    this.started = false;

    this.leftPressed = false;
    this.rightPressed = false;
    this.spacePressed = false;
    this.canvasController = new CanvasController(this);


  }

  setup() {
    this.setupPlayer();
    this.setupEnemies();
    this.setupKeyHandlers();
  }

  setupPlayer() {
    let p = new Player({
      direction: new Vector2d(0, 0),
      position: new Vector2d(320, 300),
      width: 20,
      height: 20
    });
    this.addEntity(p);
  }

  setupEnemies() {
    for (let i = 0; i < 5; i++) {
      const e = new Enemy({
        direction: new Vector2d(1, 1),
        position: new Vector2d(100 + 40 * i, 20),
        width: 20,
        height: 20
      });
      this.addEntity(e);
    }
  }
  setupKeyHandlers() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
  }

  keyDownHandler(e) {
    e.preventDefault();
    if (e.keyCode == 39) {
      this.rightPressed = true;
    } else if (e.keyCode == 37) {
      this.leftPressed = true;
    } else if (e.keyCode == 32) {
      this.spacePressed = true;
    }

    // console.log("keydown", e);
  }

  keyUpHandler(e) {
    if (e.keyCode == 39) {
      this.rightPressed = false;
    } else if (e.keyCode == 37) {
      this.leftPressed = false;
    } else if (e.keyCode == 32) {
      this.spacePressed = false;
    }
    // console.log("keyup: ", e);
  }

  play() {
    this.started = true;
    this.setup();
    window.setInterval(this.update.bind(this), 16);
  }

  addEntity(entity) {
    this.entities.push(entity);
    if (entity instanceof Enemy) {
      this.enemies.push(entity);
    } else if (entity instanceof Player) {
      this.player = entity;
    } else if (entity instanceof Bullet) {
      this.bullets.push(entity)
    }
    return this.entities;
  }

  removeEntities(entities) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      this.removeItemFromArray(entity, this.entities);

      // removeItemFromArray checks if index is not found, so we can call on every array
      this.removeItemFromArray(entity, this.enemies);
      this.removeItemFromArray(entity, this.bullets);
      if (entity instanceof Player) {
        this.player = null;
      }
    }
    return entities;
  }

  removeItemFromArray(item, array) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  handleSpacePress() {
    if (this.spacePressed) {
      let bullet = new Bullet({
        position: this.player.position,
        width: 20,
        height: 20,
        type: PLAYER_BULLET_TYPE
      });
      this.addEntity(bullet);
    }
  }

  handlePlayerMovement() {
    if (this.leftPressed) {
      this.player.direction = new Vector2d(-30, 0);
    } else if (this.rightPressed) {
      this.player.direction = new Vector2d(30, 0);
    } else {
      this.player.direction = new Vector2d(0, 0);
    }
  }

  checkEntityInBounds(entity) {
    this.handleBulletBounds(entity);
  }

  handleBulletBounds(entity) {
    if (entity instanceof Bullet &&
      (entity.position.y + entity.height < 0 || entity.position.y > CANVAS_HEIGHT)) {
      this.removeEntities([entity]);
    }
  }

  checkCollisions() {
    let collisionPairs = [];

    for (let i = 0; i < this.enemies.length; i++) {
      collisionPairs.push({
        entity1: this.enemies[i],
        entity2: this.player
      })

      for (let j = 0; j < this.bullets.length; j++) {
        collisionPairs.push({
          entity1: this.enemies[i],
          entity2: this.bullets[j]
        })

        collisionPairs.push({
          entity1: this.bullets[j],
          entity2: this.player
        })
      }
    }

    for (let i = 0; i < collisionPairs.length; i++) {
      let entity1 = collisionPairs[i].entity1;
      let entity2 = collisionPairs[i].entity2;

      if (entity1 && entity2 && entity1.collisionRect().intersects(entity2.collisionRect())) {
        // enemy collides with player
        if (entity1 instanceof Enemy && entity2 instanceof Player) {
          this.handleEnemyPlayerCollision();
        } else if (entity1 instanceof Enemy &&
          entity2 instanceof Bullet &&
          entity2.type == PLAYER_BULLET_TYPE) {
          this.handleEnemyBulletCollision();
        }
      }
    }
  }

  handleEnemyPlayerCollision() {
    console.log("enemy player collision");
  }

  handleEnemyBulletCollision() {
    console.log("enemy bullet collision");
  }

  update(dt = 16) {
    this.handlePlayerMovement();
    this.handleSpacePress();

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      // console.log(`x: ${entity.position.x}, y: ${entity.position.y}`)
      entity.update(dt);

      this.checkEntityInBounds(entity);
      this.checkCollisions();
    }

    this.canvasController.render();
  }
}

export default Game;