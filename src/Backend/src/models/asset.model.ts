import { tables, enums } from '@database';
import type { Asset as AssetSchema } from '@prisma/client';
import Model from '@models';
import DeviceModel from '@models/device.model';

export default class Asset extends Model<AssetSchema> {
	protected data: AssetSchema | null;
	protected table = tables.asset;

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

	async changeIdentifier(identifier: string): Promise<void> {
		await this.update({ identifier });
	}

	async changeDescription(description: string): Promise<void> {
		await this.update({ description });
	}

	async getDevices(): Promise<DeviceModel[] | null> {
		return await this.getManyRelation('Devices', DeviceModel);
	}
}
