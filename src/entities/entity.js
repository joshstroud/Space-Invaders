import Rectangle from "../util/rectangle"
import Vector2d from "../util/vector";

class Entity {
  constructor({
    position,
    speed,
    direction,
    width,
    height
  }) {
    this.position = position;
    this.speed = speed;
    this.direction = direction;

    this.width = width;
    this.height = height;
  }

  collisionRect() {
    return new Rectangle(this.position.x, this.position.y, this.width, this.height)
  }

  update(dt) {
    // const newX = this.x + this.speed * this.direction.x;
    // const newY = this.y + this.speed * this.direction.y;
    // return new Vector2d(newX, newY);
  }
}

export default Entity