import { Express } from 'express';

export abstract class Middleware {
	abstract setup(app: Express): void;
}

export abstract class RouteMiddleware {
	set callback(handler: (req: any, res: any, next: any) => void) {
		this.callback = handler;
	}

	get callback(): (req: any, res: any, next: any) => void {
		return this.callback;
	}

	constructor(callback: (req: any, res: any, next: any) => void) {
		this.callback = callback;
	}
}
