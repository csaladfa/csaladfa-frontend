import { fetchAll } from './api';
import Graph from './data/graph';
import type DataNode from './data/node';

export function buildGraph() {
  const data = fetchAll();

  const graph = new Graph();

  data.forEach((item) => {
    const dataNode = graph.addNode(item.id.toString());

    item.children.forEach((child) => {
      const childNode = graph.addNode(child.toString());
      childNode.level = dataNode.level + 1;

      graph.addChild(dataNode, childNode);
    });
  });

  return graph;
}
