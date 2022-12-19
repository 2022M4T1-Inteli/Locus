var WebSocketServer: any = require('websocket').server;
import Route from '@listeners';
import Redis from '@services/redis.service';
export default class WebsocketService {
	private wss: any;
	private listeners: any = {};

	addListener(event: string, callback: any) {
		this.listeners[event] = callback;
	}

	addListenerRoute(route: Route) {
		route.setup(this);
	}

	callback(event: string, data: any) {
		if (this.listeners.hasOwnProperty(event)) {
			this.listeners[event](data);
		} else {
			console.log('No listener for event: ' + event);
			console.log('current listeners: ' + JSON.stringify(this.listeners));
		}
	}

	async reset_locator() {
		await Redis.set('to_locate', JSON.stringify({}));
	}

	constructor(http: any) {
		this.wss = new WebSocketServer({
			httpServer: http,
			autoAcceptConnections: false,
		});

		this.wss.broadcast = function (data: any) {
			this.wss.clients.forEach((client: any) => client.send(data));
		};

		this.wss.on('request', (request: any) => {
			console.log('Client connected');

			var connection: any = request.accept(null, request.origin);

			console.log(new Date() + ' Connection accepted.');

			connection.on('message', async (message: any) => {
				if (message.type === 'utf8') {
					console.log('Received Message: ' + message.utf8Data);

					try {
						var data = JSON.parse(message.utf8Data);
					} catch (e) {
						console.log('Error parsing JSON: ' + e);
						return;
					} finally {
						if (data.hasOwnProperty('event')) {
							if (data.event === 'reset_locator') {
								console.log('Resetting locator');
								await this.reset_locator();
							} else {
								this.callback(data.event, data);
							}
						}
					}
				}

				let mac_str = JSON.parse(
					(await Redis.get('to_locate')) || '{}',
				);
				if (mac_str.hasOwnProperty('mac_str')) {
					console.log(
						'Sending locate command to client, mac: ' +
							mac_str.mac_str,
					);

					connection.send(mac_str.mac_str);
				}
			});

			connection.on(
				'close',
				function (reasonCode: any, description: any) {
					console.log(
						new Date() +
							' Peer ' +
							connection.remoteAddress +
							' disconnected.',
					);
				},
			);
		});
	}
}
