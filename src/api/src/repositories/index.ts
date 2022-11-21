export default abstract class Repository<ModelType> {
	protected abstract table: any;
	protected abstract model: any;
	protected primary_key: string = 'uuid';

	async create(data: any): Promise<ModelType> {
		return new this.model(await this.table.create({ data }));
	}

	async findByPk(pk: string): Promise<ModelType | null> {
		const user = await this.table.findUnique({
			where: { [this.primary_key]: pk },
		});

		return user ? new this.model(user) : null;
	}

	async findUnique(query: any): Promise<ModelType | null> {
		const user = await this.table.findUnique(query);

		return user ? new this.model(user) : null;
	}

	async findMany(query: any): Promise<ModelType[]> {
		const users = await this.table.findMany(query);

		return users.map((user: any) => new this.model(user));
	}

	async delete(pk: string): Promise<boolean> {
		const user = await this.table.delete({
			where: { [this.primary_key]: pk },
		});

		return !!user;
	}

	async count(query: any): Promise<number> {
		return await this.table.count(query);
	}
}
