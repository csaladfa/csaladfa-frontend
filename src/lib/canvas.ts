import { Application, Container, Graphics, type ContainerChild } from 'pixi.js';
import { ScrollBox } from '@pixi/ui';
import Node from './Node';
import { clamp } from './utils';

class Canvas {
  private app: Application;
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
    this.app.destroy(true);
    this.destroyEventListeners();
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
    const boundListener = this.handleScroll.bind(this);

    // @ts-ignore
    window.addEventListener('wheel', boundListener, {
      passive: false,
    });
  }

  destroyEventListeners(): void {
    // @ts-ignore
    window.removeEventListener('wheel', this.handleScroll);
  }
}

export default new Canvas();
