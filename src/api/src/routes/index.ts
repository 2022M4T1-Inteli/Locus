import { Router, Express, Request, Response, NextFunction } from 'express';
import { RouteMiddleware } from '@middlewares/express';

export default class Route {
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
		method: 'get' | 'post' | 'put' | 'delete',
		endpoint: string,
		middleware: RouteMiddleware[],
		handler: (req: Request, res: Response) => void,
	): void {
		let non_throw_handler = async (
			req: Request,
			res: Response,
			next: NextFunction,
		) => {
			try {
				await handler(req, res);
			} catch (e) {
				next(e);
			}
		};

		this.router[method](
			endpoint,
			...middleware.map((m) => m.callback),
			non_throw_handler,
		);
	}
}
