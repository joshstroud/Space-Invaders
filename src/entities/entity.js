import Rectangle from "../util/rectangle"
import Vector2d from "../util/vector";

class Entity {
  constructor({
    position,
    direction,
    width,
    height
  }) {
    this.position = position;
    this.direction = direction;

    this.width = width;
    this.height = height;
  }

  collisionRect() {
    return new Rectangle(this.position.x, this.position.y, this.width, this.height)
  }

  update(dt) {
    const newX = this.position.x + this.direction.x / dt;
    const newY = this.position.y + this.direction.y / dt;
    this.position = new Vector2d(newX, newY);
  }
}

export default Entity