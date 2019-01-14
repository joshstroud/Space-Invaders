import Entity from "./entity"
import Vector2d from "../util/vector";
import * as GameConstants from "../util/constants"
import Sprite from "../util/sprite";

const WAIT_TIME_AFTER_PLAYER_DEATH = 1000;

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

    this.spriteImage = image;
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

  die(game) {
    if (this.dying) {
      return;
    }
    game.livesRemaining -= 1;

    let spriteFinishCallback = () => {
      game.removeEntities([this]);
      if (game.livesRemaining > 0) {
        window.setTimeout(game.setupPlayer.bind(game), WAIT_TIME_AFTER_PLAYER_DEATH);
      }
    }

    this.dying = true;
    this.direction = new Vector2d(0, 0);

    let sprite = new Sprite(this.spriteImage, new Vector2d(158, 139), this.position, [32, 32], 1,
      [0, 1, 2], "horizontal", spriteFinishCallback)
    this.sprite = sprite;
    clearInterval(this.fireInterval)


  }
}
export default Player;