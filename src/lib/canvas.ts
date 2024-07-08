import { Application, Container, Graphics } from 'pixi.js';
import { ScrollBox } from '@pixi/ui';

class Canvas {
  private app: Application;
  private scrollBox: ScrollBox;

  async init(container: HTMLDivElement): Promise<void> {
    this.app = new Application();

    await this.app.init({ resizeTo: window, backgroundColor: 0xefefef, backgroundAlpha: 0 });
    container.appendChild(this.app.canvas);

    // this.createScrollBox();
    this.createNode();
    this.addEventListeners();
  }

  async destroy(): Promise<void> {
    this.app.destroy();
    this.destroyEventListeners();
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

    this.app.stage.addChild(node);
  }

  private handleScroll(): void {
    this.app.stage.scale.set(0.5, 0.5);
    console.log('scroll');
  }

  addEventListeners(): void {
    window.addEventListener('mousewheel', this.handleScroll.bind(this));
  }

  destroyEventListeners(): void {
    window.removeEventListener('mousewheel', this.handleScroll);
  }
}

export default new Canvas();
