//import { Middleware } from '@middlewares/socket';
//import SocketService from '../../services/socket.service';
//import authenticationMiddleware from '@middlewares/socket/authentication.middleware';
//export default class PermissionMiddleware extends Middleware {
//	setup(socketService: SocketService) {
//		socketService
//			.getIO()
//			.of('/uapi')
//			.use((socket, next) => {
//				let cookieString = socket.request.headers.cookie;

//				let req: any = {
//					connection: { encrypted: false },
//					headers: { cookie: cookieString },
//				};

//				let res: any = { getHeader: () => {}, setHeader: () => {} };

//				authenticationMiddleware.session(req, res, () => {
//					console.log(req.session);
//				});

//				next();
//			});
//	}
//}
