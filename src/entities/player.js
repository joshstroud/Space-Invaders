import Entity from "./entity"

class Player extends Entity {
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

export default Player;