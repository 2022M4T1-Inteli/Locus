import { tables, enums } from '@database';
import type { DeviceLocation as DeviceLocationSchema } from '@prisma/client';
import Model from '@models';
import DeviceModel from '@models/device.model';
import RoomModel from '@models/room.model';

export default class DeviceLocation extends Model<DeviceLocationSchema> {
	protected data: DeviceLocationSchema | null;
	protected table = tables.deviceLocation;
	protected primary_key = 'id';

	get id(): bigint | null {
		return this.data?.id ?? null;
	}

	get created_at(): Date | null {
		return this.data?.created_at ?? null;
	}

	async getDevice(): Promise<DeviceModel | null> {
		return await this.getUniqueRelation('Device', DeviceModel);
	}

	async getRoom(): Promise<RoomModel | null> {
		return await this.getUniqueRelation('Room', RoomModel);
	}
}
