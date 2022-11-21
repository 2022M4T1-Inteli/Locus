import e, { Express, Request, Response, NextFunction } from 'express';

export abstract class Middleware {
	abstract setup(app: Express): void;
}

export class RouteMiddleware extends Middleware {
	#callback: (req: Request, res: Response, next: NextFunction) => void;

	public setup(app: Express): void {
		app.use(this.#callback);
	}

	set callback(
		handler: (req: Request, res: Response, next: NextFunction) => void,
	) {
		this.#callback = handler;
	}

	get callback(): (req: Request, res: Response, next: NextFunction) => void {
		return this.#callback;
	}

	constructor(
		callback: (req: Request, res: Response, next: NextFunction) => void,
	) {
		super();
		this.#callback = callback;
	}
}

export class ErrorMiddleware extends Middleware {
	#callback: (
		err: Error,
		req: Request,
		res: Response,
		next: NextFunction,
	) => void;

	public setup(app: Express): void {
		app.use(this.#callback);
	}

	set callback(
		handler: (
			err: Error,
			req: Request,
			res: Response,
			next: NextFunction,
		) => void,
	) {
		this.#callback = handler;
	}

	get callback(): (
		err: Error,
		req: Request,
		res: Response,
		next: NextFunction,
	) => void {
		return this.#callback;
	}

	constructor(
		callback: (
			err: Error,
			req: Request,
			res: Response,
			next: NextFunction,
		) => void,
	) {
		super();
		this.#callback = callback;
	}
}
