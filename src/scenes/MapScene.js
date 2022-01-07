import Phaser from "phaser";
import Player from "../entity/Player";

export default class MapScene extends Phaser.Scene {
  constructor() {
    super("MapScene");
  }

  preload() {
    // Preload Sprites and Map
    this.load.image("tiles", "assets/maps/terrain_atlas.png");
    this.load.tilemapTiledJSON("tilemap", "assets/maps/MainScene.json");
    this.load.atlas(
      "mainSprite",
      "assets/spriteSheets/mainsprite.png",
      "assets/spriteSheets/mainsprites.json"
    );
  }

  createAnims() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("mainSprite", {
        prefix: "idle",
        end: 0,
        zeroPad: 4,
      }),
      frameRate: 5,
      repeat: -1,
    }),
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNames("mainSprite", {
          prefix: "right",
          end: 4,
          zeroPad: 4,
        }),
        frameRate: 10,
        repeat: -1,
      }),
      this.anims.create({
        key: "up",
        frames: this.anims.generateFrameNames("mainSprite", {
          prefix: "up",
          end: 4,
          zeroPad: 4,
        }),
        frameRate: 10,
        repeat: -1,
      }),
      this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNames("mainSprite", {
          prefix: "down",
          end: 4,
          zeroPad: 4,
        }),
        frameRate: 10,
        repeat: -1,
      });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // Create Map
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("Buildings", "tiles", 32, 32);

    const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const volcanoLayer = map.createStaticLayer("BeachVolcano", tileset, 0, 0);
    const craterLakeLayer = map.createStaticLayer("Crater/Lake", tileset, 0, 0);
    const treesLayer = map.createStaticLayer("Trees", tileset, 0, 0);
    const overhead = map.createStaticLayer("OverHead", tileset, 0, 0);
    const structuresLayer = map.createStaticLayer("Structures", tileset, 0, 0);
    const mushrooms = map.createStaticLayer("Items", tileset, 0, 0);

    //Player
    this.player = new Player(this, 200, 200, "mainSprite").setScale(0.5);

    //Collisions
    groundLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, groundLayer);

    volcanoLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, volcanoLayer);

    craterLakeLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, craterLakeLayer);

    treesLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, treesLayer);

    structuresLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, structuresLayer);

    mushrooms.setCollisionByProperty({ overlap: true });
    this.physics.add.overlap(this.player, mushrooms);

    this.player.body.velocity.normalize().scale(100);
    this.player.setDepth(0);
    overhead.setDepth(10);
    this.createAnims();

    //Camera Setup
    const camera = this.cameras.main;
    camera.startFollow(this.player, true);
    camera.setBounds(
      0,
      0,
      groundLayer.width * groundLayer.scaleX,
      groundLayer.height * groundLayer.scaleY,
      true
    );
  }

  update() {
    this.player.update(this.cursors);
  }
}
