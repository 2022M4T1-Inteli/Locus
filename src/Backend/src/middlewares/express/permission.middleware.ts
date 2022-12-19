import { Request, Response, NextFunction } from 'express';
import { RouteMiddleware } from '@middlewares/express';
import { enums } from '@database';
import UserRepository from '@repositories/user.repository';
import { NotAuthorizedError } from '@errors/controller.error';

export class CheckRoleAndPassPermissionMiddleware extends RouteMiddleware {
	constructor(permission: typeof enums.Role[keyof typeof enums.Role]) {
		super(async (req: Request, res: Response, next: NextFunction) => {
			if (!req.session.user) {
				return next(new NotAuthorizedError());
			}

			const user = await UserRepository.findByPk(req.session.user.uuid);

			if (!user || !user.role) {
				return next(new NotAuthorizedError());
			}

			if (
				Object.values(enums.Role).indexOf(user.role) <=
				Object.values(enums.Role).indexOf(permission)
			) {
				req.session.user.role = user.role;
				return next();
			}

			return next(new NotAuthorizedError());
		});
	}
}

export class PassRolePermissionMiddleware extends RouteMiddleware {
	constructor() {
		super(async (req: Request, res: Response, next: NextFunction) => {
			if (!req.session.user) {
				return next(new NotAuthorizedError());
			}

			const user = await UserRepository.findByPk(req.session.user.uuid);

			if (!user || !user.role) {
				return next(new NotAuthorizedError());
			}

			req.session.user.role = user.role;
			return next();
		});
	}
}

export class PassLocationsPermissionMiddleware extends RouteMiddleware {
	constructor() {
		super(async (req: Request, res: Response, next: NextFunction) => {
			if (!req.session.user) {
				return next(new NotAuthorizedError());
			}

			const user = await UserRepository.findByPk(req.session.user.uuid);

			if (!user) {
				return next(new NotAuthorizedError());
			}

			const user_locations = await user.getPermitedLocations();

			req.session.user.locations = user_locations.map((location) => {
				return {
					uuid: location.uuid,
					identifier: location.identifier,
				};
			});
			return next();
		});
	}
}
