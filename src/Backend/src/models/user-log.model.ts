import { tables, enums } from '@database';
import type { UserLog as UserLogSchema } from '@prisma/client';
import Model from '@models';
import UserModel from '@models/user.model';
export default class UserLog extends Model<UserLogSchema> {
	protected data: UserLogSchema | null;
	protected table = tables.userLog;

	get id(): bigint | null {
		return this.data?.id ?? null;
	}

	get description(): string | null {
		return this.data?.description ?? null;
	}

	get ip(): string | null {
		return this.data?.ip ?? null;
	}

	get user_agent(): string | null {
		return this.data?.user_agent ?? null;
	}

	get created_at(): Date | null {
		return this.data?.created_at ?? null;
	}

	async getUser(): Promise<UserModel | null> {
		return await this.getUniqueRelation('User', UserModel);
	}
}
