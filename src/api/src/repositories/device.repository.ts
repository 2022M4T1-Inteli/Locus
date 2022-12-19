import { tables } from '@database';
import Device from '@models/device.model';
import Repository from '@repositories';

class DeviceRepository extends Repository<Device> {
	table = tables.device;
	model = Device;

	async findDeviceByMacAddress(macandress: string): Promise<Device | null> {
		return await this.findUnique({ where: { macandress } });
	}
}

export default new DeviceRepository();
