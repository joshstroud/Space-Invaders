import Entity from "./entity"
import Vector2d from "../util/vector";

export const HOME_STATE = "HOME_STATE";
export const CHASING_STATE = "CHASING_STATE";

export class Enemy extends Entity {
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
    this.state = HOME_STATE;
  }
}