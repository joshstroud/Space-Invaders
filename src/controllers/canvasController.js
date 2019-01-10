import Enemy from "../entities/enemy"
import Player from "../entities/player"

class canvasController {
  constructor(game) {
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.game = game;
  }

  drawBox(color, entity) {
    this.context.fillStyle = color;
    this.context.fillRect(entity.x, entity.y, entity.x + entity.width, entity.y + entity.height);
  }

  render() {
    this.context.fillStyle = "#000000";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.game.entities.length; i++) {
      let entity = this.game.entities[i];

      let color = null;
      if (entity instanceof Enemy) {
        color = "#00ff00";
      } else {
        color = "#ffffff"
      }
      this.drawBox(color, entity);
    }
  }


}