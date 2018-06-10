export class Texture {
  loaded = false;
  private img = new Image();

  constructor(public url: string) {}

  load(): Promise<any> {
    return new Promise((resole, reject) => {
      this.img.onload = () => {
        this.loaded = true;
        resole();
      };
      this.img.onerror = reject;
      this.img.src = this.url;
    });
  }

  getImage() {
    return this.img;
  }
}
