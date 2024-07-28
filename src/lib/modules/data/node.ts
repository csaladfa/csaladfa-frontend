export default class DataNode {
  id: string;
  parents: Set<DataNode>;
  children: Set<DataNode>;

  level: number = 0;

  constructor(id: string) {
    this.id = id;
    this.parents = new Set();
    this.children = new Set();
  }

  addChild(node: DataNode) {
    this.children.add(node);
  }

  addParent(node: DataNode) {
    this.parents.add(node);
  }
}
