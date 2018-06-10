import { Pipe } from "./pipe";
import { Renderable, Renderer } from "./renderer";
import { Tickable, GameData } from "./tickable";
import { random } from "./util";

export class Pipes implements Renderable, Tickable {
  static SPEED_STEP = 0.2;

  private ticks = 0;
  private pipes: Pipe[] = [];
  private width: number;
  private height: number;
  private lastTopH: number;
  private lastLvl = 0;
  private speed = 1;

  constructor(private color: string) {}

  addPipe() {
    const topH = this.getNewTopH();
    const buffer = this.width * 0.1;

    this.pipes.push(new Pipe(this.width + buffer, topH, this.color));
  }

  tick(data: GameData) {
    this.width = data.width;
    this.height = data.height;

    if (this.ticks === 0) {
      this.addPipe();
    }

    if (this.lastLvl !== data.lvl) {
      this.speed += Pipes.SPEED_STEP;
      this.lastLvl = data.lvl;
    }

    this.ticks += this.speed;

    if (this.ticks >= 300) {
      this.ticks = 0;
    }

    for (const pipe of this.pipes) {
      pipe.setSpeed(this.speed);
      pipe.tick(data);

      if (pipe.gone()) {
        this.pipes.splice(this.pipes.indexOf(pipe), 1);
      }
    }
  }

  render(renderer: Renderer): void {
    for (const pipe of this.pipes) {
      pipe.render(renderer);
    }
  }

  private getNewTopH() {
    const height = this.height * 0.2;
    let topH = 0;

    do {
      topH = random(height, this.height / 2);
    } while (Math.abs(topH - this.lastTopH) > 50);

    return this.lastTopH = topH;
  }
}
