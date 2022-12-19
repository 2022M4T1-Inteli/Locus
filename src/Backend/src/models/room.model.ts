import { tables, enums } from '@database';
import type { Room as RoomSchema } from '@prisma/client';
import Model from '@models';
import DeviceModel from '@models/device.model';
import DeviceLocationModel from '@models/device-location.model';
import UserModel from '@models/user.model';

export default class Room extends Model<RoomSchema> {
	protected data: RoomSchema | null;
	protected table = tables.room;

	get uuid(): string | null {
		return this.data?.uuid ?? null;
	}

	get active(): boolean | null {
		return this.data?.active ?? null;
	}

	get identifier(): string | null {
		return this.data?.identifier ?? null;
	}

	get description(): string | null {
		return this.data?.description ?? null;
	}

	get created_at(): Date | null {
		return this.data?.created_at ?? null;
	}

	get updated_at(): Date | null {
		return this.data?.updated_at ?? null;
	}

	async changeActive(active: boolean): Promise<void> {
		await this.update({ active });
	}

	async changeDescription(description: string): Promise<void> {
		await this.update({ description });
	}

	async changeIdentifier(identifier: string): Promise<void> {
		await this.update({ identifier });
	}

	async getDevices(): Promise<DeviceModel[] | null> {
		return await this.getManyRelation('Devices', DeviceModel);
	}

	async getDevicesHistory(): Promise<DeviceLocationModel[] | null> {
		return await this.getManyRelation(
			'DevicesHistory',
			DeviceLocationModel,
		);
	}

	async getUsers(): Promise<UserModel[] | null> {
		return await this.getManyRelation('Users', UserModel);
	}
}
