import Entity from "./entity"

class Enemy extends Entity {
  constructor({
    position,
    speed,
    direction
  }) {
    super({
      position,
      speed,
      direction
    });

  }
}

export default Enemy;