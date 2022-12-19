import { tables, enums } from '@database';
import type { DeviceLog as DeviceLogSchema } from '@prisma/client';
import Model from '@models';
import DeviceModel from '@models/device.model';

export default class DeviceLog extends Model<DeviceLogSchema> {
	protected data: DeviceLogSchema | null;
	protected table = tables.deviceLog;
	protected primary_key: string = 'id';

	get id(): bigint | null {
		return this.data?.id ?? null;
	}

	get type(): typeof enums.LogType[keyof typeof enums.LogType] | null {
		return this.data?.type ?? null;
	}

	get message(): string | null {
		return this.data?.message ?? null;
	}

	get created_at(): Date | null {
		return this.data?.created_at ?? null;
	}

	async getDevice(): Promise<DeviceModel | null> {
		return await this.getUniqueRelation('Device', DeviceModel);
	}
}
