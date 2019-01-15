import Vector2d from "../util/vector"

const WAIT_TIME_AFTER_PLAYER_DEATH = 1000;

class SoundButton {
  constructor(
    position
  ) {}

  removeLife() {

  }

  render(ctx) {
    ctx.font = "30px FontAwesome";
    this.sprite.render(ctx);
  }
}
export default PlayerLife;