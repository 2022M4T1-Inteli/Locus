import { PrismaClient, Role, DeviceType, LogType } from '@prisma/client';

const tables = new PrismaClient();
const enums = {
	Role: Role,
	DeviceType: DeviceType,
	LogType: LogType,
};

export { enums, tables };
