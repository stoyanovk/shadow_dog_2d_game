import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

export function getCanvasContext(canvas) {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  return canvas.getContext("2d");
}
