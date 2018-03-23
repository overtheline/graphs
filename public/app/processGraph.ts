import { getEdge, IEdge } from './edge';
import { getVertex, IVertex } from './vertex';

interface IData {
	edges: Array<[number, number]>;
	vertices: number[];
}

export interface IGraph {
	links: IEdge[];
	nodes: IVertex[];
}

export function processDataToGraph(data: IData): IGraph {
	return {
		links: data.edges.map(getEdge),
		nodes: data.vertices.map(getVertex),
	};
}
