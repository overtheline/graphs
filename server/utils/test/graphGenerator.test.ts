import { expect } from 'chai';

import { generateVertices, treeGenerator } from '../graphGenerator';

describe('generateVertices', () => {
	it('returns an array of basic vertex objects.', () => {
		const test = generateVertices(10);
		expect(test).to.be.an('array').with.lengthOf(10);
		test.forEach((d, i) => {
			expect(d).to.be.an('object').and.to.haveOwnProperty('id');
			expect(d).to.haveOwnProperty('level');
			expect(d).to.haveOwnProperty('value');
			expect(d.id).to.equal(`id-${i}`);
		});
	});
});

describe('treeGenerator', () => {
	it('returns a tree object with properties \"edges\" and \"vertices\" that are arrays.', () => {
		const test = treeGenerator(2, 3);
		expect(test).to.be.an('object');
		expect(test).to.haveOwnProperty('edges');
		expect(test).to.haveOwnProperty('vertices');
		expect(test).to.haveOwnProperty('vertexMap');
		expect(test.vertices).to.be.an('array').have.lengthOf(3);
		expect(test.edges).to.be.an('array').have.lengthOf(2);
		expect(test.vertexMap).to.be.an('object');
	});

	it('returns a 3-balanced tree with 12 vertices', () => {
		const { edges, vertices } = treeGenerator(3, 12);

		vertices.forEach((vertex, index) => {
			const vertexEdges = edges.filter(([v0]) => v0 === vertex) || [];
			if (index < 3) {
				expect(vertexEdges.length).to.equal(3);
			}
			if (index === 3) {
				expect(vertexEdges.length).to.equal(2);
			}

			if (index > 3) {
				expect(vertexEdges.length).to.equal(0);
			}
		});
	});
});
