export default class GraphNode {
  id: string;
  edges: Set<GraphNode>;

  constructor(id: string) {
    this.id = id;
    this.edges = new Set();
  }

  addEdge(node: GraphNode) {
    this.edges.add(node);
  }
}
