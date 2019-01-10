import Entity from "../entities/entity"
import Vector2d from "../util/vector"
import Player from "../entities/player"
import Game from "../controllers/game"
import Enemy from "../entities/enemy"

export const testAddAndRemoveEntities = () => {
  window.Entity = Entity;
  window.vector = Vector2d;
  window.player = Player;
  let p1 = new Player({
    direction: new vector(1, 1),
    speed: 0.5,
    position: new vector(20, 20)
  });
  window.p1 = p1;
  let e1 = new Enemy({
    direction: new vector(1, 1),
    speed: 0.5,
    position: new vector(20, 20)
  });
  window.e1 = e1;

  window.game = Game;
  let g = new Game();
  window.g = g;

  g.addEntity(e1);
  g.addEntity(p1);
}