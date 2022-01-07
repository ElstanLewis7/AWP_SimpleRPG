import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  preload() {
    // Preload Title Scene
    this.load.image("title", "assets/backgrounds/titleScene.png");
    this.load.audio("music", "assets/audio/forest.wav");
  }

  create() {
    // Create Map
    this.titleScene = this.add.image(300, 200, "title");
    const music = this.sound.add("music");
    music.setLoop(true);
    music.play();
    this.titleScene
      .setInteractive()
      .on("pointerdown", () => this.scene.start("MapScene"), this);
  }
}
