import WebsocketService from '../services/socket.service';
import colors from 'colors';

export default class Route {
	private listeners: any = {};

	addListener(event: string, callback: (data: any) => void) {
		this.listeners[event] = callback;
	}

	public setup(websocketService: WebsocketService) {
		for (const event in this.listeners) {
			console.log(colors.green('Adding listener for event: ' + event));
			websocketService.addListener(event, this.listeners[event]);
		}
	}
}
