import { Router, Express } from 'express';
import { RouteMiddleware } from '@middlewares/express';

export default abstract class Route {
	public router: Router;
	public root_path: string = '/api';

	constructor(root_path: string = '/') {
		this.router = Router();
		this.root_path = `${this.root_path}${root_path}`;
	}

	public setup(app: Express): void {
		app.use(this.root_path, this.router);
	}

	public addEndpoint(
		endpoint: string,
		method: 'get' | 'post' | 'put' | 'delete',
		middleware: RouteMiddleware[],
		handler: (req: any, res: any) => any,
	): void {
		this.router[method](
			endpoint,
			...middleware.map((m) => m.callback),
			handler,
		);
	}
}
