import compression from 'compression';
import { Express } from 'express';
import { Middleware } from '@middlewares/express';

class PerformanceMiddleware extends Middleware {
	setup(app: Express): void {
		app.use(compression());
	}
}

export default new PerformanceMiddleware();
