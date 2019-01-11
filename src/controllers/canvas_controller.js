import {
  Enemy
} from "../entities/enemy"
import Player from "../entities/player"
import Background from "./background"


class canvasController {
  constructor(game) {
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.game = game;

    this.background = new Background();
  }

  drawBox(color, entity) {
    this.context.fillStyle = color;
    this.context.fillRect(entity.position.x, entity.position.y, entity.width, entity.height);
  }



  // sprite(options) {

  //   var that = {},
  //     frameIndex = 0,
  //     tickCount = 0,
  //     ticksPerFrame = options.ticksPerFrame || 0,
  //     numberOfFrames = options.numberOfFrames || 1;

  //   that.context = options.context;
  //   that.width = options.width;
  //   that.height = options.height;
  //   that.image = options.image;

  //   that.update = function () {

  //     tickCount += 1;

  //     if (tickCount > ticksPerFrame) {

  //       tickCount = 0;

  //       // If the current frame index is in range
  //       if (frameIndex < numberOfFrames - 1) {
  //         // Go to the next frame
  //         frameIndex += 1;
  //       } else {
  //         frameIndex = 0;
  //       }
  //     }
  //   };

  //   that.render = function () {

  //     // Clear the canvas
  //     that.context.clearRect(0, 0, that.width, that.height);

  //     // Draw the animation
  //     that.context.drawImage(
  //       that.image,
  //       frameIndex * that.width / numberOfFrames,
  //       0,
  //       16,
  //       16,
  //       0,
  //       0,
  //       16,
  //       16);
  //   };

  //   return that;
  // }

  // drawSpriteTest() {
  //   this.context.drawImage(
  //     this.sprites,
  //     0,
  //     0,
  //     spriteSize,
  //     spriteSize,
  //     0,
  //     0,
  //     spriteSize,
  //     spriteSize);
  // }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.render(this.context);
    // this.drawSpriteTest();
    for (let i = 0; i < this.game.entities.length; i++) {
      let entity = this.game.entities[i];

      entity.render(this.context);
      // console.log(`x: ${entity.position.x}, y: ${entity.position.y}`)
      // let color = null;
      // if (entity instanceof Enemy) {
      //   color = "#00ff00";
      // } else {
      //   color = "#ffffff"
      // }

      // this.drawBox(color, entity);
    }
  }
}

export default canvasController