import morgan from 'morgan';
import { Express } from 'express';
import { Middleware } from '@middlewares/express';

class DebugMiddleware extends Middleware {
	setup(app: Express): void {
		app.use(morgan('dev'));
	}
}

export default new DebugMiddleware();
