export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.facingLeft = false;
  }

  // Check which controller button is being pushed and execute movement & animation

  updateMovement(cursors) {
    if (cursors.left.isDown) {
      this.setVelocityX(-100);
      if (!this.facingLeft) {
        this.facingLeft = true;
        this.flipX = !this.flipX;
        this.play("right", true);
      }
      this.play("right", true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(100);
      if (this.facingLeft) {
        this.facingLeft = false;
        this.flipX = !this.flipX;
        this.play("right", true);
      }
      this.play("right", true);
    } else if (cursors.up.isDown) {
      this.setVelocityY(-100);
      this.play("up", true);
    } else if (cursors.down.isDown) {
      this.setVelocityY(100);
      this.play("down", true);
    } else {
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.play("idle", true);
    }
  }

  update(cursors) {
    this.updateMovement(cursors);
  }
}
