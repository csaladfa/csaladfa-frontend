import { Application, Container, FederatedPointerEvent, Graphics } from 'pixi.js';
import Node from './Node';
import { clamp } from '../utils';

class Controller {
  private app: Application;
  private treeWrapper: Container;

  private readonly TRANSFORM_SPEED: number = 1.5;
  private readonly SCALE_SPEED: number = 0.005;
  private readonly MAX_SCALE: number = 2;
  private readonly MIN_SCALE: number = 0.5;

  private transform: { x: number; y: number } = { x: 0, y: 0 };
  private scale: number = 1;

  constructor() {
    this.app = new Application();
    this.treeWrapper = new Container({
      width: this.app.stage.width,
      height: this.app.stage.height,
      interactive: true,
    });

    this.handleScroll = this.handleScroll.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  async init(container: HTMLDivElement): Promise<void> {
    await this.app.init({ resizeTo: window, backgroundColor: 0xff0000, backgroundAlpha: 0 });
    this.app.stage.interactive = true;

    container.appendChild(this.app.canvas);

    this.app.stage.addChild(this.treeWrapper);

    this.createEventListeners();

    this.createNode();
  }

  async destroy(): Promise<void> {
    this.destroyEventListeners();
    this.app.destroy(true);
  }

  createNode(): void {
    const node = new Node(this.treeWrapper);

    node.render();

    node.addChildNodes(3);
  }

  private handleScroll(event: WheelEvent): void {
    event.preventDefault();

    const { clientX, clientY } = event;
    const { scale, SCALE_SPEED, MIN_SCALE, MAX_SCALE } = this;

    this.scale = clamp(scale + event.deltaY * SCALE_SPEED, MIN_SCALE, MAX_SCALE);
    this.treeWrapper.scale.set(this.scale, this.scale);
    this.treeWrapper.position.set(
      clientX - (clientX - this.transform.x) * this.scale,
      clientY - (clientY - this.transform.y) * this.scale,
    );
  }

  private handleDrag(event: MouseEvent): void {
    event.preventDefault();

    const { movementX, movementY } = event;
    const { x, y } = this.transform;

    this.transform = {
      x: x + movementX * this.TRANSFORM_SPEED,
      y: y + movementY * this.TRANSFORM_SPEED,
    };

    this.treeWrapper.position.set(this.transform.x, this.transform.y);
  }

  private createEventListeners(): void {
    const { handleDrag, handleScroll } = this;

    this.app.canvas.addEventListener('wheel', handleScroll);
    this.app.canvas.addEventListener('pointerdown', () => {
      let dragging = false;

      const handlePointerMove = (mouseMoveEvent: PointerEvent) => {
        dragging = true;
        handleDrag(mouseMoveEvent);
      };

      this.app.canvas.addEventListener('pointermove', handlePointerMove);

      this.app.canvas.addEventListener('pointerup', () => {
        if (!dragging) {
          console.log('click!');
        }

        this.app.canvas.removeEventListener('pointermove', handlePointerMove);
      });
    });
  }

  private destroyEventListeners(): void {
    this.treeWrapper.off('wheel', this.handleScroll);
    this.treeWrapper.off('mousemove', this.handleDrag);
  }
}

export default new Controller();
