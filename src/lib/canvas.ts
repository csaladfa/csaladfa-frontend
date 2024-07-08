import { Application, Graphics } from 'pixi.js';
import Node from './Node';
import { clamp } from './utils';

class Canvas {
  private app: Application;

  private boundScrollListener: ((event: WheelEvent) => void) | undefined;

  private scale: number = 1;

  constructor() {
    this.app = new Application();
  }

  async init(container: HTMLDivElement): Promise<void> {
    await this.app.init({ resizeTo: window, backgroundColor: 0xefefef, backgroundAlpha: 0 });
    container.appendChild(this.app.canvas);

    this.createNode();
    this.addEventListeners();
  }

  async destroy(): Promise<void> {
    this.destroyEventListeners();
    this.app.destroy(true);
  }

  createNode(): void {
    const node = new Node();

    this.renderNode(node);
  }

  renderNode(node: Graphics): void {
    this.app.stage.addChild(node);
  }

  private handleScroll(event: WheelEvent): void {
    event.preventDefault();

    requestAnimationFrame(() => {
      this.scale = clamp(this.scale + event.deltaY * 0.005, 1, 2);
      this.app.stage.scale.set(this.scale, this.scale);
    });
  }

  addEventListeners(): void {
    this.boundScrollListener = this.handleScroll.bind(this);

    this.app.canvas.addEventListener('wheel', this.boundScrollListener, {
      passive: false,
    });
  }

  destroyEventListeners(): void {
    if (this.boundScrollListener) {
      this.app.canvas.removeEventListener('wheel', this.boundScrollListener);
    }
  }
}

export default new Canvas();
