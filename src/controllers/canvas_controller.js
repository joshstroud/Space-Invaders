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

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.background.render(this.context);


    for (let i = 0; i < this.game.entities.length; i++) {
      let entity = this.game.entities[i];

      entity.render(this.context);
    }

    for (let i = 0; i < this.game.uiElements.length; i++) {
      let uiElement = this.game.uiElements[i];
      uiElement.render(this.context);
    }
    this.context.font = "30px Arial";
    this.context.fillStyle = "#ffffff";
    this.context.fillText(`Score: ${this.game.score}`, 300, 40);
  }
}

export default canvasController