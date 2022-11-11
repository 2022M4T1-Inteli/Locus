import express, { Express } from 'express';
import { Middleware } from '@middlewares/express';
import colors from 'colors';

export default class ExpressService {
	private app: Express;
	private port: number;

	constructor(port: number) {
		this.port = port;

		this.app = express();
		this.app.set('port', this.port);
	}

	getApp(): Express {
		return this.app;
	}

	addMiddleware(...middlewares: Middleware[]): void {
		middlewares.forEach((middleware) => {
			middleware.setup(this.app);
			console.log(
				colors.green(
					`Middleware ${middleware.constructor.name} added...`,
				),
			);
		});
	}

	addRouter(...routers: any[]): void {
		routers.forEach((router) => {
			this.app.use(router);
			console.log(
				colors.green(`Router ${router.constructor.name} added...`),
			);
		});
	}
}
