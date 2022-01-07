import Phaser from "phaser";
import MapScene from "../scenes/MapScene";
import TitleScene from "../scenes/TitleScene";

export default {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  parent: "phaser-game",
  physics: {
    // Specify physics engine and configuration
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  pixelArt: true,
  roundPixels: true,
  scene: [TitleScene, MapScene],
};
