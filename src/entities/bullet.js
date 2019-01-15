import Entity from "./entity"
import Vector2d from "../util/vector";
import * as GameConstants from "../util/constants"

import {
  Howl,
  Howler
} from "howler";

import playerLaserSound from "../sounds/laser_default.mp3";
import enemyLaserSound from "../sounds/enemy_laser.mp3";


export const ENEMY_BULLET_TYPE = "ENEMY_BULLET_TYPE";
export const PLAYER_BULLET_TYPE = "PLAYER_BULLET_TYPE";

export const BULLET_SPEED = 3;

export class Bullet extends Entity {
  constructor({
    position,
    direction,
    type
  }) {
    let bulletWidth = 2;
    let bulletHeight = 12;

    super({
      position,
      direction,
      width: bulletWidth,
      height: bulletHeight
    });

    this.type = type;


    if (this.type === ENEMY_BULLET_TYPE) {
      this.direction = new Vector2d(0, BULLET_SPEED);
    } else if (this.type === PLAYER_BULLET_TYPE) {
      this.direction = new Vector2d(0, -1 * BULLET_SPEED);
    }
    this.direction = this.direction.multiply(20);

    let soundSrc = playerLaserSound;
    if (this.type === ENEMY_BULLET_TYPE) {
      soundSrc = enemyLaserSound;
    }
    var sound = new Howl({
      src: [soundSrc]
    });

    sound.play();
  }

  render(ctx) {
    if (this.type === PLAYER_BULLET_TYPE) {
      // yellow
      ctx.fillStyle = "#EAEA39"
    } else {
      ctx.fillStyle = "#ffffff"
    }

    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

}