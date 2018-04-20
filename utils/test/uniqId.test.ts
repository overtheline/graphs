import { expect } from 'chai';

import { uniqId } from '../uniqid';

describe('uniqId', () => {
	const nextId = uniqId();
	it('returns a string id with prefix \"id-\"', () => {
		expect(nextId()).to.be.a('string').and.to.equal('id-0');
	});

	it('returns sequentially consecutive ids', () => {
		expect(nextId()).to.be.a('string').and.to.equal('id-1');
		expect(nextId()).to.be.a('string').and.to.equal('id-2');
		expect(nextId()).to.be.a('string').and.to.equal('id-3');
	});

	it('returns an id with a custom prefix', () => {
		const customId = uniqId('bananas-123-');

		expect(customId()).to.be.a('string').and.to.equal('bananas-123-0');
		expect(customId()).to.be.a('string').and.to.equal('bananas-123-1');
		expect(customId()).to.be.a('string').and.to.equal('bananas-123-2');
	});
});
