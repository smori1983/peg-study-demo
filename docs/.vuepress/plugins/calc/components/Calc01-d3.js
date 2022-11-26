/**
 * @typedef {import('d3-hierarchy').HierarchyNode} HierarchyNode
 */

import * as selection from 'd3-selection';
import * as hierarchy from 'd3-hierarchy';

export function prepare(data) {
  prepareVisit(data);
}

const prepareVisit = (data) => {
  if (data.type === 'number') {
    data.children = [];
  } else {
    data.children.forEach((child) => {
      prepareVisit(child);
    })
  }
};

/**
 * @param {HTMLElement} element
 */
export function clear(element) {
  selection.select(element).selectAll('*').remove();
}

/**
 * @param {HTMLElement} element
 * @param {Object} data
 */
export function run(element, data) {
  const width = element.clientWidth;
  const height = element.clientHeight;

  const graphClearance = 50;
  const fontSize = 20;
  const pathClearance = 5;

  const root = hierarchy.hierarchy(data);
  const tree = hierarchy.tree().size([width - graphClearance * 2, height - graphClearance * 2]);
  tree(root);

  const g = selection.select(element)
    .append('g')
    .attr('transform', `translate(${graphClearance}, ${graphClearance})`);

  const link = g.selectAll('.link')
    .data(root.descendants().slice(1))
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d => `
      M ${d.x},${d.y - (fontSize + pathClearance)}
      L ${d.parent.x},${d.parent.y + pathClearance}
    `);

  const node = g.selectAll('.node')
    .data(root.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`);

  node.append('text')
    .attr('text-anchor', 'middle')
    .attr('font-size', `${fontSize}px`)
    .text(d => d.data.text);
}

