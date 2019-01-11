import Entity from "./entity"
import Vector2d from "../util/vector";
import * as GameConstants from "../util/constants"
import Sprite from "../util/sprite";

class Player extends Entity {
  constructor({
    position,
    speed,
    direction,
    canvasWidth,
    game,
    image
  }) {
    let sprite = new Sprite(image, new Vector2d(2, 140), position, [32, 32], 1, [0])
    let width = 32;
    let height = 32;

    super({
      position,
      speed,
      direction,
      width,
      height,
      canvasWidth,
      game,
      sprite
    });

    this.canvasWidth = canvasWidth;

  }

  update(dt) {
    super.update(dt);
    if (this.position.x < 0) {
      this.position = new Vector2d(0, this.position.y)
    } else if ((this.position.x + this.width) > GameConstants.CANVAS_WIDTH) {
      this.position = new Vector2d(GameConstants.CANVAS_WIDTH - this.width, this.position.y)
    }
  }

  die(collidingEntity) {
    this.game.livesRemaining -= 1;

    collidingEntity.position = new Vector2d(100000, 10000);
    this.game.removeEntities([collidingEntity]);

    if (this.game.livesRemaining < 0) {
      this.game.endGame();
    }
  }
}
export default Player;