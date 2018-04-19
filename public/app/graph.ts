import * as d3 from 'd3';
import {
	IGraph,
	IGraphUpdater,
	IVertex,
} from '../../types';

export function d3Graph(
	selectTarget: string,
	alphaDecay: number,
	alphaMin: number,
	alphaTarget: number,
	velocityDecay: number
): IGraphUpdater {
	const svg = d3.select(`#${selectTarget}`);
	const width = Number(svg.attr('width'));
	const height = Number(svg.attr('height'));
	const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

	const nodes = [
		{ id: 666, level: 0 },
		{ id: 777, level: 1 },
	];

	const node = svg.append('g').selectAll('circle');
	node.data(nodes)
		.enter().append('circle')
			.attr('r', 2.5)
			.attr('fill', (d: any) => colorScale(d.level));

	const simulation = d3.forceSimulation<any>(nodes);
	simulation.alphaMin(alphaMin / 100);
	simulation.alphaDecay(alphaDecay / 100);
	simulation.alphaTarget(alphaTarget / 100);
	simulation.velocityDecay(velocityDecay / 100);
	simulation.force('charge', d3.forceCollide().radius(5));
	simulation.force('r', d3.forceRadial((d: any) => d.level * 100));
	simulation.on('tick', ticked);

	function ticked() {
		node.attr('cx', (d: any) => d.x)
				.attr('cy', (d: any) => d.y);
	}

	return {
		updateGraph(nextGraph: IGraph) {
			nodes.push({ id: 888, level: 2});
			node.data(nodes);
			node.exit().remove();
			node.enter().append('circle')
				.attr('r', 2.5)
				.attr('fill', (d: any) => colorScale(d.level));
			simulation.nodes(nodes);
		},
		updateParams(
			nextAlphaDecay: number,
			nextAlphaMin: number,
			nextAlphaTarget: number,
			nextVelocityDecay: number
		) {
			simulation.alphaMin(nextAlphaMin / 100);
			simulation.alphaDecay(nextAlphaDecay / 100);
			simulation.alphaTarget(nextAlphaTarget / 100);
			simulation.velocityDecay(nextVelocityDecay / 100);
			simulation.restart();
			simulation.alpha(1);
		},
	};
}
