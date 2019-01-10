import Enemy from "../entities/enemy"
import Player from "../entities/player"

class Game {
  constructor() {
    this.entities = [];
    this.enemies = [];
    this.player = null;
    this.gameRect
    this.started = false;
  }

  setup() {
    let p1 = new Player({
      direction: new vector(1, 1),
      speed: 0.5,
      position: new vector(20, 20),
      width: 20,
      height: 20
    });
    this.addEntity(p1);
    let e1 = new Enemy({
      direction: new vector(1, 1),
      speed: 0.5,
      position: new vector(200, 200),
      width: 20,
      height: 20
    });
    this.addEntity(e1);
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

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      // console.log(`x: ${entity.position.x}, y: ${entity.position.y}`)
      entity.update(dt);
    }
  }
}

export default Game;