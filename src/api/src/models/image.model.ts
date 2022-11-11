import { tables, enums } from '@database';
import type { Image as ImageSchema } from '@prisma/client';
import Model from '@models';

export default class Image extends Model<ImageSchema> {
	protected data: ImageSchema | null;
	protected table = tables.image;
	protected primary_key = 'id';

	get id(): number | null {
		return this.data?.id ?? null;
	}

	get filename(): string | null {
		return this.data?.filename ?? null;
	}

	get filepath(): string | null {
		return this.data?.filepath ?? null;
	}

	get mimetype(): string | null {
		return this.data?.mimetype ?? null;
	}

	get size(): number | null {
		return this.data?.size ?? null;
	}

	get created_at(): Date | null {
		return this.data?.created_at ?? null;
	}

	get updated_at(): Date | null {
		return this.data?.updated_at ?? null;
	}
}
