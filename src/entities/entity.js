import Rectangle from "../util/rectangle"
import Vector2d from "../util/vector";

class Entity {
  constructor({
    position,
    direction,
    width,
    height,
    game,
    sprite
  }) {
    this.position = position;
    this.direction = direction;

    this.width = width;
    this.height = height;
    this.game = game;
    this.sprite = sprite;
  }

  collisionRect() {
    return new Rectangle(this.position.x, this.position.y, this.width, this.height)
  }

  update(dt) {
    const newX = this.position.x + this.direction.x / dt;
    const newY = this.position.y + this.direction.y / dt;
    this.position = new Vector2d(newX, newY);

    if (this.sprite) {
      this.sprite.updatePos(this.position)
      this.sprite.update(dt);
    }
  }

  render(ctx) {
    if (this.sprite) {
      this.sprite.render(ctx);
    }
  }
}

export default Entity