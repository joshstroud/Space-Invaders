import starfieldUrl from "../img/starfield-640x480.png"

class Background {
  constructor() {
    this.image = new Image();
    this.image.src = starfieldUrl;

  }

  render(ctx) {
    ctx.drawImage(this.image, 0, 0)
  }
}

export default Background;