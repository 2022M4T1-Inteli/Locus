import { tables } from '@database';
import User from '@models/user.model';
import Repository from '@repositories';

class UserRepository extends Repository<User> {
	table = tables.user;
	model = User;

	async findByEmail(email: string): Promise<User | null> {
		return await this.findUnique({
			where: {
				email,
			},
		});
	}
}

export default new UserRepository();
