import { Texture } from './texture';

export interface GameData {
  width: number;
  height: number;
  G: number;
  lvl: number;
  textures: TextureMap;
}

export interface TextureMap {
  [k: string]: Texture;
}

export interface Tickable {
  tick(data: GameData, dt: number);
}
