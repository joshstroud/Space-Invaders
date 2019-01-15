import Entity from "./entities/entity"
import Vector2d from "./util/vector"
import Player from "./entities/player"
import Game from "./controllers/game"
import {
  Enemy
} from "./entities/enemy"

import {
  testAddAndRemoveEntities
} from "./tests/game_tests"
import {
  testCanvas
} from "./tests/global_tests"

// testAddAndRemoveEntities();
// testCanvas();

const startGame = () => {
  const game = new Game();
  window.game = game;

  const playBtn = document.getElementById("play-btn");
  playBtn.addEventListener("click", (e) => {
    e.target.classList.add("hidden");
    game.play();
  });
}

startGame();