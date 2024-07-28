import { Container, Graphics, type ContainerChild, type FillInput } from 'pixi.js';
import Controller from './controller';
import type DataNode from '../data/node';

export default class GraphNode extends Graphics {
  private stage: Container;
  private dataNode: DataNode;
  // private text: string;

  private readonly DEFAULT_COLOR: FillInput = 0x666666;
  private readonly HOVER_COLOR: FillInput = 0x999999;
  private readonly CLICKED_COLOR: FillInput = 0x333333;

  xOffset = 0;
  yOffset = 0;

  constructor(stage: Container, dataNode: DataNode) {
    super({
      eventMode: 'dynamic',
    });
    this.stage = stage;
    this.dataNode = dataNode;

    this.createEventListeners();
    this.setRect();
    this.setFill(this.DEFAULT_COLOR);
  }

  setFill(fill: FillInput): void {
    this.setRect();
    this.fill(fill);
  }

  setOffset(x: number, y: number) {
    this.xOffset = x;
    this.yOffset = y;
  }

  setRect(): void {
    this.context.clear();

    this.rect(400 + this.xOffset, 150 + this.yOffset, 100, 100).stroke({
      color: 0x000,
      width: 2,
      alignment: 0,
    });
  }

  private createEventListeners(): void {
    const handler = Controller.getOnClickHandler();

    this.on('pointerdown', () => {
      if (handler) {
        this.setFill(this.CLICKED_COLOR);
        handler(this);
      }
    });

    this.on('pointerup', () => {
      this.setFill(this.HOVER_COLOR);
    });

    this.on('pointerenter', () => {
      this.setFill(this.HOVER_COLOR);
    });

    this.on('pointerleave', () => {
      this.setFill(this.DEFAULT_COLOR);
    });
  }

  render(): void {
    this.stage.addChild(this);
  }
}
