import { Renderable, Renderer } from "./renderer";
import { Tickable, GameData } from "./tickable";

export class Bird implements Renderable, Tickable {
  static width = 128;
  static halfWidth = Bird.width / 2;
  static height = 50;
  static halfHeight = Bird.height / 2;
  static xPos = 0.2;
  static ANGLE_ACC = 0.001;
  static ROTATION_ACC_LIM = 0.1;
  static ROTATION_LIM = 0.3;

  private x = 0;
  private y = 0;
  private yAcc = 0;
  private rotation = 0;
  private rotationAcc = 0;

  constructor(private color: string) {}

  jump() {
    this.yAcc = -1.5;
  }

  tick(data: GameData) {
    this.x = data.width * Bird.xPos;
    this.yAcc += data.G;
    this.rotationAcc =
      this.yAcc < 0
        ? this.rotationAcc - Bird.ANGLE_ACC
        : this.rotationAcc + Bird.ANGLE_ACC;
    this.y += this.yAcc;
    this.rotation += this.rotationAcc;

    if (this.rotationAcc > Bird.ROTATION_ACC_LIM) {
      this.rotationAcc = Bird.ROTATION_ACC_LIM;
    }

    if (this.rotationAcc < -Bird.ROTATION_ACC_LIM) {
      this.rotationAcc = -Bird.ROTATION_ACC_LIM;
    }

    if (this.rotation > Bird.ROTATION_LIM) {
      this.rotation = Bird.ROTATION_LIM;
      this.rotationAcc = 0;
    }

    if (this.rotation < -Bird.ROTATION_LIM) {
      this.rotation = -Bird.ROTATION_LIM;
      this.rotationAcc = 0;
    }

    if (this.yAcc > 20) {
      this.yAcc = 20;
    }

    if (this.y + Bird.height <= 0) {
      this.y = -Bird.height;
    }

    if (this.y + Bird.height >= data.height) {
      this.y = data.height - Bird.height;
      this.yAcc = 0;
    }
  }

  render(renderer: Renderer): void {
    renderer.ctx.save();
    renderer.ctx.fillStyle = this.color;
    renderer.ctx.translate(this.x + Bird.halfWidth, this.y + Bird.halfHeight);
    renderer.ctx.rotate(this.rotation);
    renderer.ctx.fillRect(-Bird.halfWidth, -Bird.halfHeight, Bird.width, Bird.height);
    renderer.ctx.restore();
  }
}
