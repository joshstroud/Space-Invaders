class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v2) {
    return new Vector2d(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2) {
    return new Vector2d(this.x - v2.x, this.y - v2.y);
  }

  multiply(s) {
    return new Vector2d(this.x * s, this.y * s);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    let divisor = 1.0 / (this.length() + .000000001);
    return this.multiply(divisor);
  }
}

export default Vector2d;