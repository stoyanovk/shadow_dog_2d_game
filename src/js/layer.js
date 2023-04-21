import layer1 from "../images/backgrounds/layer-1.png";
import layer2 from "../images/backgrounds/layer-2.png";
import layer3 from "../images/backgrounds/layer-3.png";
import layer4 from "../images/backgrounds/layer-4.png";
import layer5 from "../images/backgrounds/layer-5.png";

export class Layer {
  constructor(ctx, src = layer5, speedIndex = 0.9) {
    this.image = new Image();
    this.image.src = src;
    this.width = 2000;
    this.height = 700;
    this.x = 0;
    this.ctx = ctx;
    this.speed = 3 * speedIndex;
  }
  update(acceleration) {
    if (this.x <= -this.width) this.x = 0;
    this.x = Math.floor(this.x - this.speed * acceleration);
  }
  draw() {
    this.ctx.drawImage(this.image, this.x, 0, this.width, this.height);
    this.ctx.drawImage(
      this.image,
      this.x + this.width,
      0,
      this.width,
      this.height
    );
  }
}

export class LayerFactory {
  constructor(ctx) {
    this.layers = [
      new Layer(ctx, layer1, 0.1),
      new Layer(ctx, layer2, 0.2),
      new Layer(ctx, layer3, 0.3),
      new Layer(ctx, layer4, 0.4),
      new Layer(ctx, layer5, 0.5),
    ];
    this.acceleration = 5;
    this.canResetAcceleration = true;
  }

  boostAcceleration() {
    this.acceleration = 10;
  }

  deBoostAcceleration() {
    this.acceleration = 0;
  }

  stopBG() {
    this.canResetAcceleration = false;
    this.acceleration = 0;
  }

  runBG() {
    this.canResetAcceleration = true;
    this.acceleration = 5;
  }

  slowResetAcceleration() {
    if (this.acceleration > 5) this.acceleration -= 0.2;
    if (this.acceleration < 5) this.acceleration += 0.2;
  }

  animate() {
    this.canResetAcceleration && this.slowResetAcceleration();
    this.layers.forEach((layer) => {
      layer.update(this.acceleration);
      layer.draw();
    });
  }
}
