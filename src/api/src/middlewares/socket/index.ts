import SocketService from '../../services/socket.service';

export abstract class Middleware {
	abstract setup(socketService: SocketService): void;
}
