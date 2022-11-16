import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { Express } from 'express';
import { Middleware } from '@middlewares/express';

class SecurityMiddleware extends Middleware {
	setup(app: Express): void {
		app.use(cors({ origin: process.env.API_CORS_ORIGIN }));
		app.use(helmet());
		app.use(
			rateLimit({
				windowMs: 1 * 60 * 1000,
				max: 90,
				standardHeaders: false,
				legacyHeaders: false,
			}),
		);
		app.disable('x-powered-by');
	}
}

export default new SecurityMiddleware();
