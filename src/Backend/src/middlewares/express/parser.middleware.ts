import express, { Express } from 'express';
import { Middleware } from '@middlewares/express';

class ParserMiddleware extends Middleware {
	setup(app: Express): void {
		app.use(express.json());
	}
}

export default new ParserMiddleware();
