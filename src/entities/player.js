import Entity from "./entity"
import Vector2d from "../util/vector";
import * as GameConstants from "../util/constants"

class Player extends Entity {
  constructor({
    position,
    speed,
    direction,
    width,
    height,
    canvasWidth,
    game
  }) {
    super({
      position,
      speed,
      direction,
      width,
      height,
      canvasWidth,
      game
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