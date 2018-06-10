import { Renderable, Renderer } from "./renderer";
import { Tickable, GameData } from "./tickable";
import { random } from "./util";

export class Pipe implements Renderable, Tickable {
  static holeHeight = 150;

  private width = random(70, 120);
  private halfWidth = this.width / 2;
  private speed = 2;
  private lastLvl = 0;

  constructor(
    private x: number,
    private topH: number,
    private color: string,
  ) {}

  gone() {
    return this.x + this.halfWidth <= 0;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  tick(data: GameData) {
    this.x -= this.speed;
  }

  render(renderer: Renderer): void {
    renderer.ctx.fillStyle = this.color;

    const left = this.x - this.halfWidth;
    const bottomH = this.topH + Pipe.holeHeight;
    const height = renderer.height - bottomH;

    // Top part
    renderer.ctx.fillRect(left, 0, this.width, this.topH);

    // Bottom part
    renderer.ctx.fillRect(left, bottomH, this.width, height);
  }
}
