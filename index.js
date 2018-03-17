import { treeGenerator } from './js/graphGenerator.js';
import { getVertex } from './js/vertex.js';
import { getEdge } from './js/edge.js';
import { d3Graph } from './js/graph.js';

const page = d3.select('#page');

function updateTree(seed) {
	d3.select('.random-tree-svg').remove();

	page
	.append('svg')
	.classed('random-tree-svg', true)
	.attr('width', 1200)
	.attr('height', 600);

	const vn = Math.floor(seed * 100) + 2;

	const tree = treeGenerator(vn);
	const graphData = {
		nodes: tree.vertices.map(getVertex),
		links: tree.edges.map(getEdge),
	};

	d3Graph('.random-tree-svg', graphData);
}

page
	.append('button')
	.classed('generate-tree', true)
	.text('Generate Tree')
	.on('click', () => { updateTree(Math.random()) });

updateTree(Math.random());