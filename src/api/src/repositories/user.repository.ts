import { tables } from '@database';
import User from '@models/user.model';
import Repository from '@repositories';

class UserRepository extends Repository<User> {
	table = tables.user;
	model = User;
}

export default new UserRepository();
