import { Application, Container, Graphics } from 'pixi.js';
import { ScrollBox } from '@pixi/ui';

class Canvas {
  private app: Application;
  private scrollBox: ScrollBox;

  constructor() {}

  async init(container: HTMLDivElement): Promise<void> {
    this.app = new Application();

    await this.app.init({ resizeTo: window, backgroundColor: 0xfff, backgroundAlpha: 0 });
    container.appendChild(this.app.canvas);

    this.createScrollBox();
  }

  async destroy(): Promise<void> {
    this.app.destroy();
  }

  private createScrollBox(): void {
    this.scrollBox = new ScrollBox({
      background: 0x444,
      width: 2000,
      height: 2000,
      items: [this.createNode()],
    });

    this.app.stage.addChild(this.scrollBox);
  }

  createNode(): Graphics {
    return new Graphics({
      x: 320 - 104,
      y: 180 - 104,
    })
      .rect(1500, 0, 208, 208)
      .fill(0x666666)
      .stroke({ color: 0x000, width: 4, alignment: 0 });
  }
}

export default new Canvas();
