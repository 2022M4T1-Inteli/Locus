import {
	MissingFieldError,
	NotAuthorizedError,
} from '@errors/controller.error';
import { Express, Request, Response, NextFunction } from 'express';
import { ErrorMiddleware } from '@middlewares/express';

class ErrorHandlerMiddleware extends ErrorMiddleware {
	constructor() {
		super((err: Error, req: Request, res: Response, next: NextFunction) => {
			if (err instanceof MissingFieldError) {
				return res.status(400).json({
					error: err.message,
				});
			} else if (err instanceof NotAuthorizedError) {
				return res.status(401).json({
					error: err.message,
				});
			}

			console.error(err);
			return res.status(500).send();
		});
	}
}

export default new ErrorHandlerMiddleware();
