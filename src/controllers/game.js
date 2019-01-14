import {
  Enemy,
  HOME_STATE,
  CHASING_STATE,
  RED_ENEMY,
  GREEN_ENEMY,
  PURPLE_ENEMY,
  GOLD_ENEMY
} from "../entities/enemy"

import Player from "../entities/player"
import CanvasController from "../controllers/canvas_controller"
import Vector2d from "../util/vector";
import Rectangle from "../util/rectangle";
import {
  ENEMY_BULLET_TYPE,
  PLAYER_BULLET_TYPE,
  Bullet
} from "../entities/bullet"

import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} from "../util/constants"

import PlayerLife from "../ui/player_life"

import spritesImagesUrl from "../img/sprites-2x-transparent.png";
// import spritesImagesUrl from "../img/sprites-4x.png";
const spriteSize = 32; // 4x: 64, 2x: 32, 1x: 16

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

    this.livesRemaining = 3;
    this.uiElements = [];
    this.score = 0;
  }

  setup() {
    this.spritesImage = new Image();
    this.spritesImage.src = spritesImagesUrl;
    this.setupPlayer();
    this.setupEnemies();
    this.setupKeyHandlers();
    this.setupUI();
    this.lastTime = Date.now();
  }

  setupPlayer() {
    let p = new Player({
      direction: new Vector2d(0, 0),
      position: new Vector2d(320, 500),
      width: 20,
      height: 20,
      game: this,
      image: this.spritesImage
    });
    this.addEntity(p);
  }

  setupEnemies() {
    const topLeftPos = new Vector2d(100, 60);
    const horzSpacing = 36;
    const vertSpacing = 36;

    let e1 = new Enemy({
      direction: new Vector2d(10, 0),
      position: new Vector2d(topLeftPos.x + horzSpacing * 3, topLeftPos.y),
      game: this,
      image: this.spritesImage,
      type: GOLD_ENEMY
    });
    this.addEntity(e1);

    e1 = new Enemy({
      direction: new Vector2d(10, 0),
      position: new Vector2d(topLeftPos.x + horzSpacing * 6, topLeftPos.y),
      game: this,
      image: this.spritesImage,
      type: GOLD_ENEMY
    });
    this.addEntity(e1);


    for (let horzIdx = 0; horzIdx < 6; horzIdx++) {
      const e2 = new Enemy({
        direction: new Vector2d(10, 0),
        position: new Vector2d(topLeftPos.x + horzSpacing * (horzIdx + 2), topLeftPos.y + vertSpacing),
        game: this,
        image: this.spritesImage,
        type: RED_ENEMY
      });
      this.addEntity(e2);
    }


    for (let horzIdx = 0; horzIdx < 8; horzIdx++) {
      const e3 = new Enemy({
        direction: new Vector2d(10, 0),
        position: new Vector2d(topLeftPos.x + horzSpacing * (horzIdx + 1), topLeftPos.y + vertSpacing * 2),
        game: this,
        image: this.spritesImage,
        type: PURPLE_ENEMY
      });
      this.addEntity(e3);
    }

    for (let horzIdx = 0; horzIdx < 8; horzIdx++) {
      const e = new Enemy({
        direction: new Vector2d(10, 0),
        position: new Vector2d(topLeftPos.x + horzSpacing * (horzIdx + 1), topLeftPos.y + vertSpacing * 3),
        game: this,
        image: this.spritesImage,
        type: GREEN_ENEMY
      });
      this.addEntity(e);
    }
    for (let horzIdx = 0; horzIdx < 10; horzIdx++) {
      const e = new Enemy({
        direction: new Vector2d(10, 0),
        position: new Vector2d(topLeftPos.x + horzSpacing * horzIdx, topLeftPos.y + vertSpacing * 4),
        game: this,
        image: this.spritesImage,
        type: GREEN_ENEMY
      });
      this.addEntity(e);
    }
    for (let horzIdx = 0; horzIdx < 10; horzIdx++) {
      const e = new Enemy({
        direction: new Vector2d(10, 0),
        position: new Vector2d(topLeftPos.x + horzSpacing * horzIdx, topLeftPos.y + vertSpacing * 5),
        game: this,
        image: this.spritesImage,
        type: GREEN_ENEMY
      });
      this.addEntity(e);
    }

    this.enemyBoundingRect = new Rectangle(0, 0, CANVAS_WIDTH, 200);
  }

  setupUI() {
    for (let i = this.livesRemaining - 1; i >= 0; i--) {
      const life = new PlayerLife(new Vector2d(20 + 40 * i, 550), this.spritesImage);
      this.uiElements.push(life);
    }
  }

  // updateEnemyBoundingBox() {
  //   let minX = canvasWidth;
  //   let minY = canvasHeight
  //   let maxX = 0;
  //   let maxY = 0;

  //   for(let i = 0; i < this.enemies.length; i++) {
  //     if(this.enemies[i].position.x < minX) {
  //       minX = this.enemies.position.x;
  //     }
  //     if(this.enemies[i].position.y < minY) {
  //       minY = this.enemies.position.y;
  //     }
  //     if(this.enemies[i].position.x + this.enemies[i].position.width < minX) {
  //       minX = this.enemies;
  //     }
  //     if(this.enemies[i].position.x < minX) {
  //       minX = this.enemies;
  //     }
  //   }
  // }

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
    window.requestAnimationFrame(this.update.bind(this));
  }

  gameWon() {
    return this.enemies.length === 0;
  }

  winGame() {
    console.log("player wins!")
  }

  loseGame() {
    console.log("Game Over")
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
    if (this.spacePressed && !this.bullets.some((bullet) => bullet.type === PLAYER_BULLET_TYPE)) {
      let bullet = new Bullet({
        position: new Vector2d(this.player.position.x + this.player.width / 2, this.player.position.y),
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
    this.handleEnemyBounds(entity);
  }

  handleBulletBounds(entity) {
    if (entity instanceof Bullet &&
      (entity.position.y + entity.height < 0 || entity.position.y > CANVAS_HEIGHT)) {
      this.removeEntities([entity]);
    }
  }

  handleEnemyBounds(entity) {
    if (entity instanceof Enemy) {
      if (entity.state == HOME_STATE && (entity.position.x < this.enemyBoundingRect.left() || entity.position.x + entity.width > this.enemyBoundingRect.right())) {
        for (let i = 0; i < this.enemies.length; i++) {
          let enemy = this.enemies[i];
          enemy.direction = new Vector2d(-1 * enemy.direction.x, enemy.direction.y);
        }
      }
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
          this.handleEnemyPlayerCollision(entity1);
        } else if (entity1 instanceof Enemy &&
          entity2 instanceof Bullet &&
          entity2.type == PLAYER_BULLET_TYPE) {
          this.handleEnemyBulletCollision(entity1, entity2);
        } else if (entity1 instanceof Bullet &&
          entity2 instanceof Player &&
          entity1.type == ENEMY_BULLET_TYPE) {
          this.handlePlayerBulletCollision(entity1);
        }
      }
    }
  }

  removeLife() {
    this.livesRemaining -= 1;
    const lifeIdx = this.uiElements.findIndex((el) => {
      return el instanceof PlayerLife;
    });
    this.uiElements.splice(lifeIdx, 1);
  }

  handleEnemyPlayerCollision(enemy) {
    this.player.die(this);
    enemy.die(this);
  }

  handleEnemyBulletCollision(enemy, bullet) {
    enemy.die(this);
    this.removeEntities([bullet]);
    this.score += 100;
  }

  handlePlayerBulletCollision(bullet) {
    this.player.die(this);
    this.removeEntities([bullet]);
  }

  update() {
    if (this.gameWon()) {
      this.winGame();
      return;
    } else if (this.livesRemaining <= 0) {
      this.loseGame();
      return;
    }

    if (this.player && !this.player.dying) {
      this.handlePlayerMovement();
      this.handleSpacePress();
    }
    let now = Date.now();
    let dt = (now - this.lastTime);

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];

      entity.update(dt);

      this.checkEntityInBounds(entity);
      this.checkCollisions();
    }

    this.canvasController.render();
    this.lastTime = now;
    window.requestAnimationFrame(this.update.bind(this))
  }
}

export default Game;