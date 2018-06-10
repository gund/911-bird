import { Tickable, GameData } from "./tickable";

export class Level implements Tickable {
  private ticks = 0;

  tick(data: GameData) {
    if (this.ticks === 0) {
      data.lvl++;
      console.log('new level', data.lvl);
    }

    if (this.ticks++ >= 500) {
      this.ticks = 0;
    }
  }
}
