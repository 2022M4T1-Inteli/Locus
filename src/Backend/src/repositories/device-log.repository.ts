import { tables } from '@database';
import DeviceLog from '@models/device-log.model';
import Repository from '@repositories';

class DeviceLogRepository extends Repository<DeviceLog> {
	table = tables.deviceLog;
	model = DeviceLog;
}

export default new DeviceLogRepository();
