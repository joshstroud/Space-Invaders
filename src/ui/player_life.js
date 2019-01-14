import Sprite from "../util/sprite";
import Vector2d from "../util/vector"

const WAIT_TIME_AFTER_PLAYER_DEATH = 1000;

class PlayerLife {
  constructor(
    position,
    image
  ) {
    let sprite = new Sprite(image, new Vector2d(2, 140), position, [32, 32], 1, [0]);
    this.sprite = sprite;
  }

  removeLife() {

  }

  render(ctx) {
    if (this.sprite) {
      this.sprite.render(ctx);
    }
  }
}
export default PlayerLife;