import { Container, Graphics, type ContainerChild } from 'pixi.js';

export default class Node extends Graphics {
  private ancestor: Node | undefined;
  private descendents: Node[];

  private stage: Container;

  constructor(stage: Container, ancestors?: Node) {
    super();
    this.stage = stage;
    this.descendents = [];
    this.ancestor = ancestors;
    this.rect(400, 150, 100, 100).fill(0x666666).stroke({ color: 0x000, width: 2, alignment: 0 });
  }

  addChildNodes(amount: number): void {
    const children = Array.from(Array(amount), (_, index) => {
      const childNode = new Node(this.stage, this);
      childNode.y = this.y + 150;
      childNode.x = this.x - (this.width * (amount - 1)) / 2 + this.width * index;

      return childNode;
    });

    super.addChild(...children);
    this.descendents.push(...children);
  }

  render(): void {
    this.stage.addChild(this);
  }
}
