import Entity from "./entities/entity"
import Vector2d from "./util/vector"
import Player from "./entities/player"
import Game from "./controllers/game"
import {
  Enemy
} from "./entities/enemy"


import laserSound from "./sounds/laser_default.mp3"

import {
  testAddAndRemoveEntities
} from "./tests/game_tests"
import {
  testCanvas
} from "./tests/global_tests"

// testAddAndRemoveEntities();
// testCanvas();

const setup = () => {
  const game = new Game();

  const playBtn = document.getElementById("play-btn");
  playBtn.addEventListener("click", (e) => {
    e.target.classList.add("hidden");
    game.play();
  });

  const aboutBtn = document.getElementById("project-info-button");
  aboutBtn.addEventListener("click", toggleDescription);
}

const toggleDescription = () => {
  const description = document.getElementsByClassName("description")[0];
  const aboutBtn = document.getElementById("project-info-button");

  if (description.classList.contains("hidden")) {
    description.classList.remove("hidden");
    aboutBtn.innerText = "Close"
  } else {
    description.classList.add("hidden");
    aboutBtn.innerText = "About the Project"

  }
}

setup();