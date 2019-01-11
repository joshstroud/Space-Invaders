import Entity from "./entity"
import Vector2d from "../util/vector";
import {
  Bullet,
  ENEMY_BULLET_TYPE
} from "../entities/bullet"

export const HOME_STATE = "HOME_STATE";
export const CHASING_STATE = "CHASING_STATE";

const BULLET_FIRE_PERIOD = 10;
const BULLET_FIRE_PERCENT = 1;

export class Enemy extends Entity {
  constructor({
    position,
    speed,
    direction,
    width,
    height,
    game
  }) {
    super({
      position,
      speed,
      direction,
      width,
      height,
      game
    });

    this.firePercent = BULLET_FIRE_PERCENT;
    this.firePeriod = Math.random * BULLET_FIRE_PERIOD;
    this.state = HOME_STATE;

    window.setInterval(this.fireTimer.bind(this), 100);
  }

  fireTimer(e) {
    if (this.randomPercentage() < this.firePercent) {
      let bullet = new Bullet({
        position: new Vector2d(this.position.x, this.position.y),
        type: ENEMY_BULLET_TYPE,
        game: this.game,
        width: 10,
        height: 10

      })
      this.game.addEntity(bullet);
    }
  }

  randomPercentage() {
    return Math.floor(Math.random() * (100));
  }
}