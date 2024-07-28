import { fetchAll } from './api';
import Graph from './data/graph';

export function buildGraph() {
  const data = fetchAll();

  const graph = new Graph();

  data.forEach((item) => {
    const graphNode = graph.addNode(item.id.toString());

    item.children.forEach((child) => {
      const childNode = graph.addNode(child.toString());
      graph.addChild(graphNode, childNode);
    });
  });

  return graph;
}
