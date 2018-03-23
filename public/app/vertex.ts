export interface IVertex {
	id: number;
	group: number;
}

export function getVertex(v: number): IVertex {
	return { id: v, group: v % 10 };
}
