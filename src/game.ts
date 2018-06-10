import { Bird } from "./bird";
import { Pipes } from "./pipes";
import { Renderer, Renderable } from "./renderer";
import { Texture } from "./texture";
import { TextureMap, GameData, Tickable } from "./tickable";
import { Level } from "./level";

export class Game implements GameData {
  static BG_COLOR = "green";
  static PIPE_COLOR = "black";
  static BIRD_COLOR = "white";

  width = 0;
  height = 0;
  G = 0.05;
  lvl = 0;
  textures: TextureMap = {
    bird: new Texture("/assets/plane1.png")
  };

  private renderer: Renderer;
  private pipes: Pipes;
  private bird: Bird;
  private level: Level;

  private tickables: Tickable[] = [];
  private renderables: Renderable[] = [];

  private paused = false;

  constructor(private rootNode: HTMLElement) {
    this.tick = this.tick.bind(this);
    this.resize = this.resize.bind(this);
    this.click = this.click.bind(this);
    this.keyDown = this.keyDown.bind(this);

    (async () => {
      this.init();

      try {
        await this.preload();
      } catch {}

      this.tick(0);
    })();
  }

  private init() {
    this.renderer = new Renderer();
    this.pipes = new Pipes(Game.PIPE_COLOR);
    this.bird = new Bird(Game.BIRD_COLOR);
    this.level = new Level();

    this.tickables.push(this.pipes);
    this.tickables.push(this.bird);
    this.tickables.push(this.level);

    this.renderables.push(this.pipes);
    this.renderables.push(this.bird);

    this.rootNode.appendChild(this.renderer.canvas);

    this.resize();

    window.addEventListener("resize", this.resize, false);
    window.addEventListener("mousedown", this.click, false);
    window.addEventListener("keydown", this.keyDown, false);
  }

  private preload(): Promise<any> {
    return Promise.all(
      Object.keys(this.textures).map(key => this.textures[key].load())
    );
  }

  private resize() {
    const bounds = this.rootNode.getBoundingClientRect();
    this.width = bounds.width;
    this.height = bounds.height;

    this.renderer.setSize(this.width, this.height);
  }

  private tick(dt: number) {
    requestAnimationFrame(this.tick);
    this.renderer.clear(Game.BG_COLOR);
    this.processTicks(dt);
    this.processRenders();
  }

  private processTicks(dt: number) {
    if (this.paused) {
      return;
    }

    for (const tickable of this.tickables) {
      tickable.tick(this, dt);
    }
  }

  private processRenders() {
    for (const renderable of this.renderables) {
      this.renderer.render(renderable);
    }
  }

  private click() {
    this.dispatch(() => this.bird.jump());
  }

  private keyDown(e: KeyboardEvent) {
    const key = e.keyCode;

    switch (e.keyCode) {
      case 32: // Space
        this.dispatch(() => this.bird.jump());
        break;
      case 80: // P
        this.paused = !this.paused;
        break;
    }
  }

  private dispatch(fn: Function) {
    if (!this.paused) {
      fn();
    }
  }
}
