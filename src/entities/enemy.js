import Entity from "./entity"

class Enemy extends Entity {
  constructor({
    position,
    speed,
    direction,
    width,
    height
  }) {
    super({
      position,
      speed,
      direction,
      width,
      height
    });

  }
}

export default Enemy;