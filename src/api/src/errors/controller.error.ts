enum ControllerErrorCode {
	MISSING_FIELD,
	NOT_FOUND,
	NOT_AUTHORIZED,
}

export class ControllerError extends Error {
	code: ControllerErrorCode;
	constructor(code: ControllerErrorCode) {
		super();
		this.code = code;
	}
}
export class MissingFieldError extends ControllerError {
	field: string;

	constructor(field: string) {
		super(ControllerErrorCode.MISSING_FIELD);
		this.message = `Missing required field in request body: ${field}`;
		this.field = field;
	}
}

export class NotFoundError extends ControllerError {
	constructor() {
		super(ControllerErrorCode.NOT_FOUND);
		this.message = 'Not found';
	}
}

export class NotAuthorizedError extends ControllerError {
	constructor() {
		super(ControllerErrorCode.NOT_AUTHORIZED);
		this.message = 'Not authorized';
	}
}
