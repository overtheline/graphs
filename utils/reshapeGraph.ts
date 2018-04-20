import {
	ID3Graph,
	IGraph,
	ILink,
	INode,
} from '../types';

export function reshapeGraph({
	edges,
	vertexMap,
	vertices,
}: IGraph): ID3Graph {
	const nodes: INode[] = vertices.map((vertex) => {
		const { id, level: group }  = vertexMap[vertex];

		return { group, id };
	});

	const links: ILink[] = edges.map(([source, target]) => {
		return {
			source,
			target,
			value: vertexMap[target].value,
		};
	});

	return {
		links,
		nodes,
	};
}
