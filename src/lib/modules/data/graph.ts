import DataNode from './node';

export default class Graph {
  nodes: Map<string, DataNode>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(id: string) {
    let node = this.nodes.get(id);

    if (node) {
      return node;
    }

    node = new DataNode(id);
    this.nodes.set(id, node);
    return node;
  }

  addChild(source: DataNode, destination: DataNode) {
    const sourceNode = this.addNode(source.id);
    const destinationNode = this.addNode(destination.id);

    sourceNode.addChild(destinationNode);
    destinationNode.addParent(sourceNode);

    return [sourceNode, destinationNode];
  }

  getNodes() {
    return this.nodes;
  }
}
