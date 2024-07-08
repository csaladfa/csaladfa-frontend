import { Graphics, type ContainerChild } from 'pixi.js';

export default class Node extends Graphics {
  children: Node[];

  constructor() {
    super();
    this.children = [];
    this.rect(0, 0, 208, 208).fill(0x666666).stroke({ color: 0x000, width: 4, alignment: 0 });
  }

  addChildNodes(...children: Node[]): void {
    super.addChild(...children);
    this.children.push(...children);
  }
}
