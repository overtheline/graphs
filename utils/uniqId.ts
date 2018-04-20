function* idGenerator(prefix: string) {
	let id = 0;
	while (true) {
		yield `${prefix}${id}`,
		id++;
	}
}

type nextId = () => string;

export function uniqId(prefix = 'id-'): nextId {
	const gen = idGenerator(prefix);

	return () => gen.next().value;
}
