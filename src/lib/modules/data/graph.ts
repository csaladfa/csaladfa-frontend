import GraphNode from './node';

class Graph {
  nodes: Map<string, GraphNode>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(id: string) {
    let node = this.nodes.get(id);

    if (node) {
      return node;
    }

    node = new GraphNode(id);
    this.nodes.set(id, node);
    return node;
  }

  addEdge(source: GraphNode, destination: GraphNode) {
    const sourceNode = this.addNode(source.id);
    const destinationNode = this.addNode(destination.id);

    sourceNode.addEdge(destinationNode);

    return [sourceNode, destinationNode];
  }
}
