import dotenv from 'dotenv';

import ConsoleUtils from '@utils/console.util';
import SecurityMiddleware from '@middlewares/express/security.middleware';
import DebugMiddleware from '@middlewares/express/debug.middleware';
import PerformanceMiddleware from '@middlewares/express/performance.middleware';
import ParserMiddleware from '@middlewares/express/parser.middleware';

import ExpressService from '@services/express.service';
import HttpService from '@services/http.service';
import SocketService from '@services/socket.service';

ConsoleUtils.addTimeOnConsole();

dotenv.config();

const port: number = parseInt(process.env.API_PORT || '3131');
const host: string = process.env.API_HOST || 'localhost';

const app = new ExpressService(port);

app.addMiddleware(
	SecurityMiddleware,
	PerformanceMiddleware,
	DebugMiddleware,
	ParserMiddleware,
);

app.addRouter();

const http = new HttpService(port, host, app.getApp());

const socket = new SocketService(http.getServer());

socket.addMiddleware();

socket.addListener();

http.listen();
