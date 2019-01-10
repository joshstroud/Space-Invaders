class Rectangle {
  constructor(x, y, width, height) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + height;
  }

  intersects(otherRect) {
    const horzIntersection = this.left() >= otherRect.left() && this.right() <= otherRect.right();
    const vertIntersection = this.top() >= otherRect.top() && this.bottom() <= otherRect.bottom();

    return horzIntersection && vertIntersection;
  }
}