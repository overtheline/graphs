export interface IEdge {
	source: number;
	target: number;
	value: number;
}

export function getEdge([source, target]: [number, number]): IEdge {
	return { source, target, value: 4 };
}
