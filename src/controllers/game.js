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

  play() {
    this.started = true;
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
}

export default Game;