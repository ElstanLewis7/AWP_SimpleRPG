/** @type {import("../public/typings/phaser")} */

import Phaser from "phaser";

import config from "./config/config";

class Game extends Phaser.Game {
  constructor() {
    // Add the config file to the game
    super(config);

    // Start the game with the mainscene
    this.scene.start("TitleScene");
  }
}
// Create new instance of game
window.onload = function () {
  window.game = new Game();
};
