export interface Renderable {
  render(ctx: Renderer): void;
}

export class Renderer {
  readonly canvas = document.createElement('canvas');
  readonly ctx = this.canvas.getContext('2d');

  width: number;
  height: number;

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  render(renderable: Renderable) {
    renderable.render(this);
  }

  clear(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
