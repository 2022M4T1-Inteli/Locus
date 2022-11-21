import bcrypt from 'bcrypt';
import UserRepository from '@repositories/user.repository';
import { enums } from '@database';

const users_seed = async () => {
	await UserRepository.create({
		username: 'admin',
		email: 'admin@localhost.com',
		password: await bcrypt.hash('admin', 10),
		role: enums.Role.ADMIN,
	});

	await UserRepository.create({
		username: 'viewer',
		email: 'viewer@localhost.com',
		password: await bcrypt.hash('viewer', 10),
		role: enums.Role.VIEWER,
	});
};

(async () => {
	await users_seed();
})();
