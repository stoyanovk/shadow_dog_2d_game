import { getCanvasContext } from "./getCanvas";
import { ShadowDog } from "./shadowDog";
import { Player } from "./player";
import { LayerFactory } from "./layer";
import { fromEvent, filter } from "rxjs";

function main() {
  const canvasEl = document.getElementById("canvas");

  const ctx = getCanvasContext(canvasEl);
  const shadowDog = new Player(ctx, new ShadowDog());
  const layer = new LayerFactory(ctx);

  function animate() {
    layer.animate();
    shadowDog.animate();
    return requestAnimationFrame(animate);
  }

  animate();

  const keyStream = fromEvent(document, "keydown");
  const keyUpStream = fromEvent(document, "keyup");

  keyStream
    .pipe(
      filter((event) => event.code === "ArrowUp" || event.code === "Space"),
      filter(() => shadowDog.isCanJump)
    )
    .subscribe(() => {
      shadowDog.onArrowUp();
    });

  keyStream
    .pipe(filter((event) => event.code === "ArrowRight"))
    .subscribe(() => {
      layer.boostAcceleration();
      shadowDog.onArrowRight();
    });

  keyStream
    .pipe(filter((event) => event.code === "ArrowLeft"))
    .subscribe((e) => {
      layer.deBoostAcceleration();
      shadowDog.onArrowLeft();
    });

  keyStream
    .pipe(
      filter((event) => event.code === "ArrowDown"),
      filter(() => shadowDog.onGround)
    )
    .subscribe(() => {
      layer.stopBG();
      shadowDog.onArrowDown();
    });

  keyUpStream
    .pipe(filter((event) => event.code === "ArrowDown"))
    .subscribe(() => {
      layer.runBG();
      shadowDog.onArrowDownUp();
    });
}

main();
