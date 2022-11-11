import { Express } from 'express';
import { Middleware } from '@middlewares/express';

class AuthenticationMiddleware extends Middleware {
	setup(app: Express): void {}
}

export default new AuthenticationMiddleware();
