import { DatabaseError, DatabaseErrorParser } from '@errors/database.error';
import { prettyPrint } from '@base2/pretty-print-object';

export default abstract class Model<SchemaType> {
	protected abstract table: any;

	protected data: SchemaType | null = null;
	protected primary_key: string = 'uuid';

	constructor(data: SchemaType | null = null) {
		this.data = data;
	}

	[require('util').inspect.custom](depth: any, opts: any) {
		return `Model<${this.constructor.name}> ${prettyPrint(this.data, {
			indent: '  ',
			singleQuotes: false,
		})}`;
	}

	async refresh(): Promise<void> {
		if (!this.data) return;

		try {
			this.data = await this.table.findUnique({
				where: {
					[this.primary_key]: (this.data as any)[this.primary_key],
				},
			});
		} catch (error: any) {
			throw DatabaseErrorParser.parse(error);
		}
	}

	async delete(): Promise<void> {
		if (!this.data) return;
		try {
			await this.table.delete({
				where: {
					[this.primary_key]: (this.data as any)[this.primary_key],
				},
			});
		} catch (error: any) {
			throw DatabaseErrorParser.parse(error);
		} finally {
			this.data = null;
		}
	}

	async update(data: Partial<SchemaType>): Promise<void> {
		if (!this.data) return;

		try {
			this.data = await this.table.update({
				where: {
					[this.primary_key]: (this.data as any)[this.primary_key],
				},
				data,
			});
		} catch (error: any) {
			throw DatabaseErrorParser.parse(error);
		}
	}

	async getManyRelation(
		relation: string,
		classType: any,
	): Promise<typeof classType[] | null> {
		if (!this.data) return null;

		try {
			return await this.table
				.findUnique({
					where: {
						[this.primary_key]: (this.data as any)[
							this.primary_key
						],
					},
				})
				[relation]()
				.then((data: any) => {
					return data.map((d: any) => new classType(d));
				});
		} catch (error: any) {
			throw DatabaseErrorParser.parse(error);
		}
	}

	async getUniqueRelation(
		relation: string,
		classType: any,
	): Promise<typeof classType | null> {
		if (!this.data) return null;

		try {
			return await this.table
				.findUnique({
					where: {
						[this.primary_key]: (this.data as any)[
							this.primary_key
						],
					},
				})
				[relation]()
				.then((data: any) => {
					return new classType(data);
				});
		} catch (error: any) {
			throw DatabaseErrorParser.parse(error);
		}
	}
}
