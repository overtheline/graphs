export interface IVertexMap {
	[id: string]: IVertex;
}

export interface IGraph {
	vertexMap: IVertexMap;
	edges: string[][];
	vertices: string[];
}

export interface IVertex {
	id: string;
	level: number;
	value: number;
}

export interface IGraphUpdater {
	updateGraph: (graph: IGraph) => void;
	updateParams: (
		alphaDecay: number,
		alphaMin: number,
		alphaTarget: number,
		velocityDecay: number
	) => void;
}
