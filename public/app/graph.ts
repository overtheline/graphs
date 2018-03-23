import * as d3 from 'd3';
import { IGraph } from './processGraph';
import { IVertex } from './vertex';

export function d3Graph(selectTarget: string, graph: IGraph): (graph: IGraph) => void {
	const svg = d3.select(selectTarget);
	const width = +svg.attr('width');
	const height = +svg.attr('height');
	const color = d3.scaleOrdinal(d3.schemeCategory10);

	const simulation = d3.forceSimulation()
			.force('link', d3.forceLink().id((d: IVertex) => `${d.id}`))
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force('yAxis', d3.forceY(height / 2).strength(0.03));

	let link = svg.append('g')
			.attr('class', 'links')
		.selectAll('line')
		.data(graph.links)
		.enter().append('line')
			.attr('stroke-width', (d) => Math.sqrt(d.value));

	let node = svg.append('g')
			.attr('class', 'nodes')
		.selectAll('circle')
		.data(graph.nodes)
		.enter().append('circle')
			.attr('r', 5)
			.attr('fill', (d) => color(`${d.group}`))
			.call(d3.drag()
					.on('start', dragstarted)
					.on('drag', dragged)
					.on('end', dragended));

	node.append('title')
			.text((d) => d.id);

	simulation
			.nodes(graph.nodes)
			.on('tick', ticked);

	simulation
			.force('link')
			.links(graph.links);

	function ticked() {
		link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

		node
				.attr('cx', (d) => d.x)
				.attr('cy', (d) => d.y);
	}

	function dragstarted(d): void {
		if (!d3.event.active) {
			simulation.alphaTarget(0.3).restart();
		}

		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d): void {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d): void {
		if (!d3.event.active) {
			simulation.alphaTarget(0);
		}

		d.fx = null;
		d.fy = null;
	}

	return function updateGraph(nextGraph): void {
		simulation.alphaTarget(0.7).restart();

		link = link.data(nextGraph.links);
		node = node.data(nextGraph.nodes);

		link
			.enter().append('line')
				.attr('stroke-width', (d) => Math.sqrt(d.value))
			.exit().remove();

		node
			.enter().append('circle')
				.attr('r', 5)
				.attr('fill', (d) => color(`${d.group}`))
				.call(d3.drag()
						.on('start', dragstarted)
						.on('drag', dragged)
						.on('end', dragended))
			.exit().remove();

		simulation
				.nodes(nextGraph.nodes)
				.on('tick', ticked);
				
		simulation.force('link')
				.links(nextGraph.links);
	}
}
