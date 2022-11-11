import { Server } from 'socket.io';

export default class SocketService {
	private io: Server;

	constructor(http: any) {
		this.io = new Server(http, {
			connectTimeout: parseInt(process.env.SOCKET_TIMEOUT || '10000'),
			path: process.env.SOCKET_DEFAULT_PATH,
			transports: ['websocket'],
			cors: {
				origin: process.env.SOCKET_CORS_ORIGIN,
			},
		});
	}

	public getIO() {
		return this.io;
	}

	addMiddleware(...middlewares: any[]) {
		middlewares.forEach((middleware) => {
			middleware(this.io);
		});
	}

	addListener(root_workspace: string = '/', ...listeners: any[]) {
		listeners.forEach((listener) => {
			listener(this.io.of(root_workspace));
		});
	}
}
