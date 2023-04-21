import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

export class Player {
  constructor(ctx, playerModel) {
    this.ctx = ctx;
    this.playerModel = playerModel;
    this.width = this.playerModel.spriteWidth / 3;
    this.height = this.playerModel.spriteHeight / 3;
    this.frameAnimationSpeedIndex = 4;
    this.animationFrame = 0;

    this.state = this.playerModel.walk(0);
    this.x = 30;
    this.y = this.groundPosition;
    this.vy = 0;
    this.vx = 0;

    this.weight = 1;
    this.jumpCounter = 0;
  }

  get groundPosition() {
    return Math.floor(CANVAS_HEIGHT - this.height - 110); // 110 it's height of platform (image)
  }

  get onGround() {
    return this.y >= this.groundPosition;
  }

  get isCanJump() {
    return this.jumpCounter < 2;
  }

  update() {
    this.jumpMove();
    this.horizontalMovement();
  }

  animate() {
    this.update();
    const { ctx, playerModel, frameAnimationSpeedIndex, width, height, x, y } =
      this;
    const { spriteWidth, spriteHeight, image } = playerModel;
    this.animationFrame += 1;
    ctx.drawImage(
      image,
      this.state.frameX * spriteWidth, // position x in sprite
      this.state.frameY * spriteHeight, // position y in sprite
      spriteWidth, // width one of sprite image
      spriteHeight, // height one of sprite image
      x, // position x in canvas where we set up our image
      y, // position y in canvas where we set up our image
      width, // width of image that wrote in canvas
      height // height of image that wrote in canvas
    );

    if (this.animationFrame % frameAnimationSpeedIndex === 0) {
      if (this.state.frameX < this.state.spritesCount) {
        this.state.frameX = this.state.frameX + 1;
      } else {
        this.state.frameX = 0;
      }
    }
  }
  // mechanics
  jumpMove() {
    if (this.y + this.vy < this.groundPosition) {
      this.y += this.vy;
    } else {
      this.y = this.groundPosition;
    }

    // logic when you in jump
    if (!this.onGround) {
      this.vy += this.weight;
      this.vy > 0 &&
        (this.state = this.playerModel.fallDown(this.state.frameX));
      return;
    }
    // logic when you in fall down
    this.vy = 0;
    this.jumpCounter = 0;

    if (this.state.frameY === this.playerModel.fallDown().frameY) {
      this.state = this.playerModel.walk(this.state.frameX);
    }
  }

  horizontalMovement() {
    this.x += this.vx;
    if (this.vx != 0) {
      this.vx > 0 ? (this.vx -= this.weight) : (this.vx += this.weight);
    }
    if (this.x < 0) this.x = 0;
    if (this.x > CANVAS_WIDTH - this.width) this.x = CANVAS_WIDTH - this.width;
  }

  // Event handlers
  onArrowUp() {
    this.state = this.playerModel.jumpUp(this.state.frameX);
    this.vy = -22;
    this.jumpCounter += 1;
  }

  onArrowRight() {
    this.state = this.playerModel.walk(this.state.frameX);
    this.vx = 20;
  }

  onArrowLeft() {
    this.state = this.playerModel.walk(this.state.frameX);
    this.vx = -20;
  }

  onArrowDown() {
    this.state = this.playerModel.lie(this.state.frameX);
  }

  onArrowDownUp() {
    this.state = this.playerModel.walk(this.state.frameX);
  }
}
