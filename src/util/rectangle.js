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
    return this.y + this.height;
  }

  intersects(otherRect) {
    //   const horzIntersection = this.left() <= otherRect.left() && this.right() <= otherRect.right();
    //   const vertIntersection = this.top() >= otherRect.top() && this.bottom() <= otherRect.bottom();

    const isIntersection =
      this.x < otherRect.x + otherRect.width &&
      this.x + this.width > otherRect.x &&
      this.y < otherRect.y + otherRect.height &&
      this.y + this.height > otherRect.y

    // return horzIntersection && vertIntersection;
    return isIntersection;
  }
}

export default Rectangle;