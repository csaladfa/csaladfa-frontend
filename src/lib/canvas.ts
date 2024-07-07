import { Application, Container, Graphics } from 'pixi.js';
import { ScrollBox } from '@pixi/ui';

class Canvas {
  private app: Application;
  private scrollBox: ScrollBox;

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
      width: this.app.screen.width,
      height: this.app.screen.height,
    });

    new Array(100).fill(0).forEach(() => this.createNode());

    this.app.stage.addChild(this.scrollBox);
  }

  createNode(): void {
    const node = new Graphics()
      .rect(0, 0, 208, 208)
      .fill(0x666666)
      .stroke({ color: 0x000, width: 4, alignment: 0 });

    this.scrollBox.addItem(node);
  }
}

export default new Canvas();
