import {
	IGraph,
	IVertex,
	IVertexMap,
} from '../../types';
import { uniqId } from '../../utils/uniqId';

const nextId = uniqId();
const random = Math.random;
const floor = Math.floor;

function nextValue() {
	return floor(random() * 9) + 1;
}

export function generateVertices(n: number): IVertex[] {
	return Array(n).fill(1).map(() => ({
		id: nextId(),
		level: 0,
		value: nextValue(),
	}));
}

/**
 * DAG generator generates a Directed Acyclic Graph where all edges are directed away
 * from the parent node to the child
 *
 * @param {number} branches k-balanced or random
 * @param {number} numberOfVertices
 * @returns ITree
 */
export function treeGenerator(
	branches: number,
	numberOfVertices: number
): IGraph {
	// validate
	if (numberOfVertices < 2) {
		throw new Error(`numberOfVertices must be at least 2. error with: ${numberOfVertices}`);
	}

	const k = floor(branches);

	const numVerts = floor(numberOfVertices);

	// populate vertices
	const vertices = generateVertices(numVerts);

	const vertexMap: IVertexMap = vertices.reduce((acc: IVertexMap, vertex: IVertex) => {
		const key = vertex.id;
		acc[key] = vertex;
		return acc;
	}, {});

	// create edges
	let edges: string[][];

	if (k > 0) {
		// k-balanced tree
		edges = vertices.reduce((acc: string[][], vertex: IVertex, index: number, arr: IVertex[]) => {
			// root
			if (index === 0) {
				return acc;
			}

			const parentIndex = floor((index - 1) / k);

			vertex.level = arr[parentIndex].level + 1;

			return [...acc, [arr[parentIndex].id, vertex.id]];
		}, []);
	} else {
		// random tree
		edges = vertices.reduce((acc: string[][], vertex: IVertex, index: number, arr: IVertex[]) => {
			// root
			if (index === 0) {
				return acc;
			}

			// branch off root to create first edge
			if (index === 1) {
				vertex.level = vertices[0].level + 1;
				return [[vertices[0].id, vertex.id]];
			}

			// select random edge
			const re: string[] = acc[floor(random() * acc.length)];
			// select random vertex from edge
			const rv = random() < 0.5 ? re[0] : re[1];
			vertex.level = vertexMap[rv].level + 1;

			return [...acc, [rv, vertex.id]];
		}, []);
	}

	return {
		edges,
		vertexMap,
		vertices: vertices.map(({ id }) => id),
	};
}
