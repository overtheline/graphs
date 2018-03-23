import * as express from 'express';
import { Application } from 'express-serve-static-core';
import * as path from 'path';

import { treeGenerator } from './graphGenerator';

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

		router.get('/tree', (req, res) => {
			const graph = treeGenerator(Math.floor(Math.random() * 10) + 2);

			res.json({
				graph,
				message: 'tree',
			});
		});

		this.express.use('/', express.static(path.join(__dirname, '../public')));
		this.express.use('/graph', router);
	}
}

export default new App().express;
