import { tables, enums } from '@database';
import type { Laboratory as LaboratorySchema } from '@prisma/client';
import Model from '@models';
import RoomModel from '@models/room.model';

export default class Laboratory extends Model<LaboratorySchema> {
	protected data: LaboratorySchema | null;
	protected table = tables.image;

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

	async getRooms(): Promise<RoomModel[] | null> {
		return await this.getManyRelation('Rooms', RoomModel);
	}
}
