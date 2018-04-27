import * as d3 from 'd3';
import {
	SimulationLinkDatum,
	SimulationNodeDatum,
} from 'd3';

import {
	IGraph,
	IGraphUpdater,
	IVertex,
} from '../../types';

type Vertex = IVertex & SimulationNodeDatum;

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

export interface IState {
	alphaDecay?: number;
	alphaMin?: number;
	alphaTarget?: number;
	selectTarget: string;
	targetHeight: number;
	targetWidth: number;
	velocityDecay?: number;
}

export default class D3Graph {
	colorScale: d3.ScaleOrdinal<any, any>;
	height: number;
	simulation: d3.Simulation<any, any>;
	svg: d3.Selection<SVGSVGElement, any, any, any>;
	width: number;

	constructor(state: IState) {
		const {
			selectTarget,
			targetHeight,
			targetWidth,
		} = state;

		this.svg = d3.select(`#${selectTarget}`);
		this.height = targetHeight;
		this.width = targetWidth;
		this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
		this.simulation = d3.forceSimulation()
				.force('link', d3.forceLink().id(({ id }) => id).strength(0.4))
				.force('charge', d3.forceCollide().radius(10))
				.force('r', d3.forceRadial((d: any) => d.group * 60));

		this.dragended = this.dragended.bind(this);
		this.dragged = this.dragged.bind(this);
		this.dragstarted = this.dragstarted.bind(this);
	}

	updateGraph(graph: any) {
		const {
			simulation,
			svg,
		} = this;

		svg.select('.links').remove();
		svg.select('.nodes').remove();

		const link = svg.append('g')
				.attr('class', 'links')
			.selectAll('line')
			.data(graph.links)
			.enter().append('line')
				.attr('stroke-width', ({ value }: any) => Math.sqrt(value));

		const node = svg.append('g')
				.attr('class', 'nodes')
			.selectAll('circle')
			.data(graph.nodes)
			.enter().append('circle')
				.attr('r', 5)
				.attr('fill', ({ group }: any) => colorScale(group))
				.call(d3.drag()
					.on('start', this.dragstarted)
					.on('drag', this.dragged)
					.on('end', this.dragended));

		simulation
			.nodes(graph.nodes)
			.on('tick', ticked);

		const linkForce: d3.ForceLink<any, any> | undefined = simulation.force('link');

		if (linkForce) {
			linkForce.links(graph.links);
		}

		function ticked() {
			link
					.attr('x1', ({ source }: any) => source.x)
					.attr('y1', ({ source }: any) => source.y)
					.attr('x2', ({ target }: any) => target.x)
					.attr('y2', ({ target }: any) => target.y);

			node
					.attr('cx', ({ x }) => x)
					.attr('cy', ({ y }) => y);
		}
	}

	dragstarted(d: any) {
		if (!d3.event.active) {
			this.simulation.alphaTarget(0.3).restart();
		}

		d.fx = d.x;
		d.fy = d.y;
	}

	dragged(d: any) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	dragended(d: any) {
		if (!d3.event.active) {
			this.simulation.alphaTarget(0);
		}

		d.fx = null;
		d.fy = null;
	}
}
