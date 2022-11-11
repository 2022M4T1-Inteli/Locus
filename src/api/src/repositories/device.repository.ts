import { tables } from '@database';
import Device from '@models/device.model';
import Repository from '@repositories';

class DeviceRepository extends Repository<Device> {
	table = tables.device;
	model = Device;
}

export default new DeviceRepository();
