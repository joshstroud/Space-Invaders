import Entity from "./entity"
import Vector2d from "../util/vector";

export const ENEMY_BULLET_TYPE = "ENEMY_BULLET_TYPE";
export const PLAYER_BULLET_TYPE = "PLAYER_BULLET_TYPE";

export class Bullet extends Entity {
  constructor({
    position,
    direction,
    width,
    height,
    type
  }) {
    super({
      position,
      direction,
      width,
      height
    });

    this.type = type;

    if (this.type === ENEMY_BULLET_TYPE) {
      this.direction = new Vector2d(0, 1);
    } else if (this.type === PLAYER_BULLET_TYPE) {
      this.direction = new Vector2d(0, -1);
    }
    this.direction = this.direction.multiply(20);
  }
}