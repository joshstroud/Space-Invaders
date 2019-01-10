import Rectangle from "../util/rectangle"

class Entity {
  constructor(position, speed, direction) {
    this.position = position;
    this.speed = speed;
    this.direction = direction;

    this.width = width;
    this.height = height;
  }

  collisionRect() {
    return new Rectangle(this.position.x, this.position.y, this.width, this.height)
  }
}