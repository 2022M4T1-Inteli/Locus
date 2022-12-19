import { Prisma } from '@prisma/client';

enum DatabaseErrorCode {
	UNKNOWN,
	NOT_FOUND,
	UNIQUE_CONSTRAINT_VIOLATION,
	FOREIGN_KEY_CONSTRAINT_VIOLATION,
	NOT_NULL_CONSTRAINT_VIOLATION,
	VALIDATION_ERROR,
}

class DatabaseError extends Error {
	constructor(
		message: string,
		public code: DatabaseErrorCode,
		public meta: any,
	) {
		super(message);
		this.name = 'DatabaseError';
		this.stack = new Error().stack;
		this.code = code;
		this.meta = meta;
	}
}

class DatabaseErrorParser {
	static parse(error: Error) {
		if (error instanceof DatabaseError) {
			return error;
		}

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			switch (error.code) {
				case 'P2025':
					return new DatabaseError(
						error.message,
						DatabaseErrorCode.NOT_FOUND,
						error.meta,
					);
				case 'P2002':
					return new DatabaseError(
						error.message,
						DatabaseErrorCode.UNIQUE_CONSTRAINT_VIOLATION,
						error.meta,
					);
				case 'P2003':
					return new DatabaseError(
						error.message,
						DatabaseErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION,
						error.meta,
					);
				case 'P2011':
					return new DatabaseError(
						error.message,
						DatabaseErrorCode.NOT_NULL_CONSTRAINT_VIOLATION,
						error.meta,
					);
				default:
					return new DatabaseError(
						error.message + ' - ' + error.code,
						DatabaseErrorCode.UNKNOWN,
						error.meta,
					);
			}
		} else if (error instanceof Prisma.PrismaClientValidationError) {
			return new DatabaseError(
				error.message,
				DatabaseErrorCode.VALIDATION_ERROR,
				null,
			);
		}

		return new DatabaseError(
			error.message,
			DatabaseErrorCode.UNKNOWN,
			null,
		);
	}
}

export { DatabaseError, DatabaseErrorParser };
