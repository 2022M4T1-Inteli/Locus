import bcrypt from 'bcrypt';
import UserRepository from '@repositories/user.repository';
import deviceRepository from '@repositories/device.repository';
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

const devices_seed = async () => {
	const device_host_1 = await deviceRepository.create({
		identifier: 1,
		macaddress: '00:00:00:00:00:01',
		type: enums.DeviceType.HOST,
		battery_level: null,
		temperature: null,
		last_seen: new Date(),
	});

	const device_peer_1 = await deviceRepository.create({
		identifier: 2,
		macaddress: '00:00:00:00:00:02',
		type: enums.DeviceType.PEER,
		battery_level: null,
		temperature: null,
		last_seen: new Date(),
	});
};

(async () => {
	await users_seed();
	await devices_seed();
})();
