import { tables, enums } from '@database';
import type { Device as DeviceSchema } from '@prisma/client';
import Model from '@models';
import DeviceLogModel from '@models/device-log.model';
import DeviceLocationModel from '@models/device-location.model';
import AssetModel from '@models/asset.model';

export default class Device extends Model<DeviceSchema> {
	protected data: DeviceSchema | null;
	protected table = tables.device;

	get uuid(): string | null {
		return this.data?.uuid ?? null;
	}

	get active(): boolean | null {
		return this.data?.active ?? null;
	}

	get identifier(): bigint | null {
		return this.data?.identifier ?? null;
	}

	get macandress(): string | null {
		return this.data?.macaddress ?? null;
	}

	get type(): typeof enums.DeviceType[keyof typeof enums.DeviceType] | null {
		return this.data?.type ?? null;
	}

	get battery_level(): number | null {
		return this.data?.battery_level ?? null;
	}

	get temperature(): number | null {
		return this.data?.temperature ?? null;
	}

	get last_seen(): Date | null {
		return this.data?.last_seen ?? null;
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

	async changeIdentifier(identifier: bigint): Promise<void> {
		await this.update({ identifier });
	}

	async changeMacAddress(macaddress: string): Promise<void> {
		await this.update({ macaddress });
	}

	async changeType(
		type: typeof enums.DeviceType[keyof typeof enums.DeviceType],
	): Promise<void> {
		await this.update({ type });
	}

	async changeBatteryLevel(battery_level: number): Promise<void> {
		await this.update({ battery_level });
	}

	async changeTemperature(temperature: number): Promise<void> {
		await this.update({ temperature });
	}

	async changeLastSeen(last_seen: Date): Promise<void> {
		await this.update({ last_seen });
	}

	async getLogs(): Promise<DeviceLogModel[] | null> {
		return await this.getManyRelation('Logs', DeviceLogModel);
	}

	async getLocationsHistory(): Promise<DeviceLocationModel[] | null> {
		return await this.getManyRelation(
			'LocationsHistory',
			DeviceLocationModel,
		);
	}

	async getAssets(): Promise<AssetModel[] | null> {
		return await this.getManyRelation('Assets', AssetModel);
	}
}
