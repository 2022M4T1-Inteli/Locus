import Route from '@routes';
import { Request, Response } from 'express';
import AuthenticationController from '@controllers/authentication.controller';
import { CheckRoleAndPassPermissionMiddleware } from '@middlewares/express/permission.middleware';

const AuthenticationRouter = new Route('/auth');

AuthenticationRouter.addEndpoint(
	'post',
	'/login',
	[],
	AuthenticationController.login,
);

AuthenticationRouter.addEndpoint(
	'get',
	'/session',
	[new CheckRoleAndPassPermissionMiddleware('ADMIN')],
	AuthenticationController.session,
);

AuthenticationRouter.addEndpoint(
	'post',
	'/logout',
	[],
	AuthenticationController.logout,
);

export default AuthenticationRouter;
