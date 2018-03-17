const random = Math.random;
const floor = Math.floor;

export function treeGenerator(nVertices) {
	let vertices = [];

	// populate vertices randomly
	for (let i = 0; i < nVertices; i++) {
		vertices.push({ label: i, order: Math.random() });
	}

	vertices.sort((a, b) => a.order - b.order);

	vertices = vertices.map((v) => v.label);

	// create edges
	const edges = vertices.reduce((acc, v, index, arr) => {
		if (index === 0) {
			return acc;
		}
		
		if (index === 1) {
			return [[arr[0], v]];
		}

		// select random edge
		const re = acc[floor(random() * acc.length)];
		// select random vertex from edge
		const rv = random() < 0.5 ? re[0] : re[1];

		return [...acc, [rv, v]];
	}, []);

	return {
		vertices,
		edges,
	};
}