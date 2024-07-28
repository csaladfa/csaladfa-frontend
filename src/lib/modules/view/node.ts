import { Container, Graphics, type ContainerChild, type FillInput } from 'pixi.js';
import Controller from './controller';
import type DataNode from '../data/node';

export default class GraphNode extends Graphics {
  private stage: Container;
  // private text: string;

  private readonly DEFAULT_COLOR: FillInput = 0x666666;
  private readonly HOVER_COLOR: FillInput = 0x999999;
  private readonly CLICKED_COLOR: FillInput = 0x333333;

  constructor(stage: Container) {
    super({
      eventMode: 'dynamic',
    });
    this.stage = stage;

    this.createEventListeners();
    this.setRect(this.DEFAULT_COLOR);
  }

  private setRect(fill: FillInput): void {
    this.context.clear();
    this.rect(400, 150, 100, 100).fill(fill).stroke({ color: 0x000, width: 2, alignment: 0 });
  }

  private createEventListeners(): void {
    const handler = Controller.getOnClickHandler();

    this.on('pointerdown', () => {
      if (handler) {
        this.setRect(this.CLICKED_COLOR);
        handler(this);
      }
    });

    this.on('pointerup', () => {
      this.setRect(this.HOVER_COLOR);
    });

    this.on('pointerenter', () => {
      this.setRect(this.HOVER_COLOR);
    });

    this.on('pointerleave', () => {
      this.setRect(this.DEFAULT_COLOR);
    });
  }

  render(): void {
    this.stage.addChild(this);
  }
}
