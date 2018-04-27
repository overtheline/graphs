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

export interface INode {
	id: string;
	group: number;
}

export interface ILink {
	source: string;
	target: string;
	value: number;
}

export interface ID3Graph {
	nodes: INode[];
	links: ILink[];
}

export interface ITask {
	assignee: any;
	completed: boolean;
	task: string;
}
