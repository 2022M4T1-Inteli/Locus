import Route from '@listeners';
import Redis from '@services/redis.service';
const route = new Route();

route.addListener('update_devices', async (data: any) => {
	let dados: any = JSON.parse((await Redis.get('temp_devices')) || '{}');
	data.devices.map((device: any) => {
		device.last_activity = new Date();
	});
	dados[data.name] = data.devices;

	await Redis.set('temp_devices', JSON.stringify(dados));
	console.log('DevicesStorageTemp: ' + JSON.stringify(dados));
});

export default route;
