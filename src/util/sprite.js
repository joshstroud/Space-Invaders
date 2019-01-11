class Sprite {
  constructor(image, framePos, spritePos, size, speed, frames, dir, once) {
    this.framePos = framePos;
    this.size = size;
    this.spritePos =
      this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.image = image;
    this.dir = dir || 'horizontal';
    this.once = once;
  };
  update(dt, newframePos) {
    // this._index += this.speed * dt;
    this._index += 0.005 * dt;
  }

  updatePos(newPos) {
    this.spritePos = newPos;
  }

  render(ctx) {
    var frame;

    if (this.speed > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    var frameX = this.framePos.x;
    var frameY = this.framePos.y;

    if (this.dir == 'vertical') {
      frameY += frame * this.size[1];
    } else {
      frameX += frame * this.size[0];
    }

    ctx.drawImage(this.image,
      frameX, frameY,
      this.size[0], this.size[1],
      this.spritePos.x, this.spritePos.y,
      this.size[0], this.size[1]);
  }
}

export default Sprite;