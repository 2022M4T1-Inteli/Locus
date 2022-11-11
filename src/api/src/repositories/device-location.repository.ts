import { tables } from '@database';
import DeviceLocation from '@models/device-location.model';
import Repository from '@repositories';

class DeviceLocationRepository extends Repository<DeviceLocation> {
	table = tables.deviceLocation;
	model = DeviceLocation;
}

export default new DeviceLocationRepository();
