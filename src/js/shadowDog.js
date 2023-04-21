import sprite from "../images/players/shadow_dog.png";

export class ShadowDog {
  constructor() {
    // this variables join with ShadowDog animation
    this.spriteWidth = 575;
    this.spriteHeight = 523;
    this.image = new Image();
    this.image.src = sprite;
  }
  stay(frameX = 0) {
    return {
      frameX,
      frameY: 0,
      spritesCount: 6,
    };
  }
  jumpUp(frameX = 0) {
    return {
      frameX,
      frameY: 1,
      spritesCount: 6,
    };
  }
  fallDown(frameX = 0) {
    return {
      frameX,
      frameY: 2,
      spritesCount: 6,
    };
  }
  walk(frameX = 0) {
    return {
      frameX,
      frameY: 3,
      spritesCount: 8,
    };
  }
  stunned(frameX = 0) {
    return {
      frameX,
      frameY: 4,
      spritesCount: 10,
    };
  }
  lie(frameX = 0) {
    return {
      frameX,
      frameY: 5,
      spritesCount: 4,
    };
  }
  roll(frameX = 0) {
    return {
      frameX,
      frameY: 6,
      spritesCount: 6,
    };
  }
  sitDown(frameX = 0) {
    return {
      frameX,
      frameY: 7,
      spritesCount: 6,
    };
  }
}
