import { Express } from 'express';
import { Middleware } from '@middlewares/express';
import session from 'express-session';
import Redis from '@services/redis.service';
import connectRedis from 'connect-redis';

class AuthenticationMiddleware extends Middleware {
	public local_session: any = undefined;

	setup(app: Express): void {
		const RedisStore = connectRedis(session);
		if (this.local_session === undefined) {
			this.local_session = session({
				secret: process.env.SESSION_SECRET || 'secretdev',
				store: new RedisStore({ client: Redis }),
				resave: false,
				saveUninitialized: false,
				cookie: {
					maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
					httpOnly: true,
					sameSite: 'strict',
				},
			});
		}
		app.use(this.local_session);
	}
}

const authenticationMiddleware = new AuthenticationMiddleware();

export default authenticationMiddleware;
