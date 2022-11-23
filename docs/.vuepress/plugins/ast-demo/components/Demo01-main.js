/**
 * @typedef {import('d3-hierarchy').HierarchyNode} HierarchyNode
 */

import * as selection from 'd3-selection';
import * as hierarchy from 'd3-hierarchy';

const data = {
  name: '+',
  children: [
    {
      name: '*',
      children: [
        {
          name: '1',
        },
        {
          name: '2',
        },
      ],
    },
    {
      name: '*',
      children: [
        {
          name: '3',
        },
        {
          name: '+',
          children: [
            {
              name: '4',
            },
            {
              name: '5',
            },
          ],
        },
      ],
    },
  ],
};

/**
 * @param {HTMLElement} element
 */
export function run(element) {
  const width = element.clientWidth;
  const height = element.clientHeight;

  const graphClearance = 50;
  const fontSize = 15;
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
    .text(d => d.data.name);
}
