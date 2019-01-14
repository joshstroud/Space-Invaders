import Entity from "./entity"
import Vector2d from "../util/vector";
import {
  Bullet,
  ENEMY_BULLET_TYPE
} from "../entities/bullet"

import Sprite from "../util/sprite"

import {
  SPRITES_FILE_NAME
} from "../util/constants";
// import sprite from `../img/sprites-2x.png`

export const HOME_STATE = "HOME_STATE";
export const CHASING_STATE = "CHASING_STATE";

const BULLET_FIRE_PERIOD = 10;
const BULLET_FIRE_PERCENT = 1;

export const RED_ENEMY = "RED_ENEMY"
export const GREEN_ENEMY = "GREEN_ENEMY"
export const PURPLE_ENEMY = "PURPLE_ENEMY"
export const GOLD_ENEMY = "GOLD_ENEMY"

export class Enemy extends Entity {
  constructor({
    position,
    speed,
    direction,
    game,
    image,
    type
  }) {
    let sprite = null;
    if (type === RED_ENEMY) {
      sprite = new Sprite(image, new Vector2d(3, 2), position, [32, 32], 1, [3, 0, 1])
    } else if (type === GREEN_ENEMY) {
      sprite = new Sprite(image, new Vector2d(3, 66), position, [32, 32], 1, [3, 0, 1])
    } else if (type === PURPLE_ENEMY) {
      sprite = new Sprite(image, new Vector2d(3, 34), position, [32, 32], 1, [3, 0, 1])
    } else if (type === GOLD_ENEMY) {
      sprite = new Sprite(image, new Vector2d(3, 98), position, [32, 32], 1, [0])
    }
    let width = 32;
    let height = 32;
    super({
      position,
      speed,
      direction,
      width,
      height,
      game,
      sprite
    });

    this.spriteImage = image;


    this.firePercent = BULLET_FIRE_PERCENT;
    this.firePeriod = Math.random * BULLET_FIRE_PERIOD;
    this.state = HOME_STATE;

    this.fireInterval = window.setInterval(this.fireTimer.bind(this), 100);
  }

  fireTimer(e) {
    if (this.randomPercentage() < this.firePercent) {
      let bullet = new Bullet({
        position: new Vector2d(this.position.x, this.position.y),
        type: ENEMY_BULLET_TYPE,
        game: this.game,
        width: 10,
        height: 10,
      })
      this.game.addEntity(bullet);
    }
  }

  die(game) {
    let spriteFinishCallback = () => {
      game.removeEntities([this]);
    }

    let sprite = new Sprite(this.spriteImage, new Vector2d(158, 139), this.position, [32, 32], 1,
      [0, 1, 2], "horizontal", spriteFinishCallback)
    this.sprite = sprite;
    clearInterval(this.fireInterval)
  }

  randomPercentage() {
    return Math.floor(Math.random() * (800));
  }
}