import Controller from '@controllers';
import { Request, Response } from 'express';
import DeviceRepository from '@repositories/device.repository';
import DeviceLocation from '@models/device-location.model';
import { enums } from '@database/index';
import Redis from '@services/redis.service';

export default class DeviceController extends Controller {
	public static async getAll(req: Request, res: Response): Promise<void> {
		let dados = JSON.parse((await Redis.get('temp_devices')) || '{}');
		let devices_data: any = [];

		Object.keys(dados).forEach((key: any) => {
			let room = key;
			dados[room].forEach((device: any) => {
				devices_data.push({
					name: device.name,
					mac_str: device.macaddress,
					battery_percent: 100,
					rssi: device.rssi,
					last_activity: device.last_activity,
					room: room,
				});
			});
		});
		devices_data.sort((a: any, b: any) => {
			if (a.rssi < b.rssi) {
				return -1;
			} else if (a.rssi > b.rssi) {
				return 1;
			} else {
				return 0;
			}
		});

		devices_data = devices_data.filter(
			(device: any, index: any, self: any) =>
				index ===
				self.findIndex((t: any) => t.mac_str === device.mac_str),
		);

		res.status(200).json(devices_data);
	}

	public static async update(req: Request, res: Response): Promise<void> {
		const { devices } = req.body;

		devices.forEach(async (device: any) => {
			let device_item = await DeviceRepository.findDeviceByMacAddress(
				device.macaddress,
			);
			if (device_item) {
				device_item.changeBatteryLevel(device.battery_level);
				device_item.changeLastSeen(new Date());
			} else {
				device_item = await DeviceRepository.create({
					identifier: 3,
					macaddress: device.macaddress,
					type: enums.DeviceType.PEER,
					battery_level: device.battery_level,
					temperature: null,
					last_seen: new Date(),
				});
			}
		});
	}

	public static async locate(req: Request, res: Response): Promise<void> {
		const { mac_str } = req.body;

		await Redis.set('to_locate', JSON.stringify({ mac_str: mac_str }));
		res.status(200).json({ message: 'Device located' });
	}
}
