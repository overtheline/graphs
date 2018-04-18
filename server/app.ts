import * as express from 'express';
import { Application } from 'express-serve-static-core';
import * as path from 'path';

import { treeGenerator } from './utils/graphGenerator';

class App {
	express: Application;

	constructor() {
		this.express = express();
		this.mountRoutes();
	}

	private mountRoutes(): void {
		const router = express.Router();

		router.get('/', (req, res) => {
			res.sendFile(path.join(__dirname, '../public/index.html'));
		});

		router.get('/tree/k/:branches/n/:vertices', (req, res) => {
			const { branches, vertices } = req.params;
			const graph = treeGenerator(branches, vertices);

			res.json({
				graph,
				message: `tree, branches: ${branches}, vertices: ${vertices}`,
			});
		});

		this.express.use('/', express.static(path.join(__dirname, '../public')));
		this.express.use('/graph', router);
	}
}

export default new App().express;
