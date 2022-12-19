import express, { Express } from 'express';
import { Middleware, ErrorMiddleware } from '@middlewares/express';
import Route from '@routes';
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

	addErrorMiddleware(...middlewares: ErrorMiddleware[]): void {
		middlewares.forEach((middleware) => {
			middleware.setup(this.app);
			console.log(
				colors.green(
					`Error Middleware ${middleware.constructor.name} added...`,
				),
			);
		});
	}

	addRouter(...routers: Route[]): void {
		routers.forEach((router) => {
			router.setup(this.app);
			console.log(
				colors.green(`Router of '${router.root_path}' added...`),
			);
		});
	}

	addRouterOrMiddleware(...routers: (Route | Middleware)[]): void {
		routers.forEach((router) => {
			if (router instanceof Route) {
				router.setup(this.app);
				console.log(
					colors.green(`Router of '${router.root_path}' added...`),
				);
			} else if (router instanceof Middleware) {
				router.setup(this.app);
				console.log(
					colors.green(
						`Middleware ${router.constructor.name} added...`,
					),
				);
			}
		});
	}
}
