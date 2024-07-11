import { Application, Graphics } from 'pixi.js';
import Node from './Node';
import { clamp } from './utils';

class Canvas {
  private app: Application;

  private boundScrollListener: ((event: WheelEvent) => void) | undefined;
  private boundDragListener: ((event: MouseEvent) => void) | undefined;

  private readonly TRANSFORM_SPEED: number = 1.5;
  private readonly SCALE_SPEED: number = 0.005;
  private readonly MAX_SCALE: number = 2;
  private readonly MIN_SCALE: number = 0.5;

  private transform: { x: number; y: number } = { x: 0, y: 0 };
  private scale: number = 1;

  constructor() {
    this.app = new Application();
  }

  async init(container: HTMLDivElement): Promise<void> {
    await this.app.init({ resizeTo: window, backgroundColor: 0xefefef, backgroundAlpha: 0 });
    container.appendChild(this.app.canvas);

    this.createEventListeners();

    this.createNode();

  }

  async destroy(): Promise<void> {
    this.destroyEventListeners();
    this.app.destroy(true);
  }

  createNode(): void {
    const node = new Node(this.app.stage);

    node.render();

    node.addChildNodes(3)
  }

  private handleScroll(event: WheelEvent): void {
    event.preventDefault();

    requestAnimationFrame(() => {
      const { clientX, clientY } = event;
      const { scale, SCALE_SPEED, MIN_SCALE, MAX_SCALE } = this;

      this.scale = clamp(scale + event.deltaY * SCALE_SPEED, MIN_SCALE, MAX_SCALE);
      this.app.stage.scale.set(this.scale, this.scale);
      this.app.stage.position.set(
        clientX - (clientX - this.transform.x) * this.scale,
        clientY - (clientY - this.transform.y) * this.scale,
      );
    });
  }

  private handleDrag(event: MouseEvent): void {
    if (event.buttons !== 1) {
      return;
    }

    event.preventDefault();

    requestAnimationFrame(() => {
      const { movementX, movementY } = event;
      const { x, y } = this.transform;

      this.transform = {
        x: x + movementX * this.TRANSFORM_SPEED,
        y: y + movementY * this.TRANSFORM_SPEED,
      };

      this.app.stage.position.set(this.transform.x, this.transform.y);
    });
  }

  private createEventListeners(): void {
    this.boundScrollListener = this.handleScroll.bind(this);
    this.boundDragListener = this.handleDrag.bind(this);

    this.app.canvas.addEventListener('wheel', this.boundScrollListener, {
      passive: false,
    });
    this.app.canvas.addEventListener('mousemove', this.boundDragListener);
  }

  private destroyEventListeners(): void {
    if (this.boundScrollListener) {
      this.app.canvas.removeEventListener('wheel', this.boundScrollListener);
    }

    if (this.boundDragListener) {
      this.app.canvas.removeEventListener('mousemove', this.boundDragListener);
    }
  }
}

export default new Canvas();
