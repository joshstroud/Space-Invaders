import Enemy from "../entities/enemy"
import Player from "../entities/player"
import CanvasController from "../controllers/canvas_controller"
import Vector2d from "../util/vector";

class Game {
  constructor() {
    this.entities = [];
    this.enemies = [];
    this.player = null;
    this.gameRect
    this.started = false;

    this.leftPressed = false;
    this.rightPressed = false;
    this.spacePressed = false;
    this.canvasController = new CanvasController(this);
  }

  setup() {
    let p1 = new Player({
      direction: new Vector2d(0, 0),
      position: new Vector2d(320, 300),
      width: 20,
      height: 20
    });
    this.addEntity(p1);
    let e1 = new Enemy({
      direction: new Vector2d(1, 1),
      position: new Vector2d(200, 200),
      width: 20,
      height: 20
    });
    this.addEntity(e1);
    this.setupKeyHandlers();
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
    }
    return this.entities;
  }

  removeEntities(entities) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      this.removeItemFromArray(entity, this.entities);

      // removeItemFromArray checks if index is not found, so we can call on every array
      this.removeItemFromArray(entity, this.enemies);
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

  update(dt = 16) {

    console.log(this.rightPressed)
    if (this.leftPressed) {
      this.player.direction = new Vector2d(-30, 0);
    } else if (this.rightPressed) {
      this.player.direction = new Vector2d(30, 0);
    } else {
      this.player.direction = new Vector2d(0, 0);
    }

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      // console.log(`x: ${entity.position.x}, y: ${entity.position.y}`)
      entity.update(dt);
    }

    this.canvasController.render();
  }
}

export default Game;