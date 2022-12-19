import dotenv from 'dotenv';

import ConsoleUtils from '@utils/console.util';
import ParserUtils from '@utils/parser.util';

import SecurityMiddleware from '@middlewares/express/security.middleware';
import DebugMiddleware from '@middlewares/express/debug.middleware';
import PerformanceMiddleware from '@middlewares/express/performance.middleware';
import ParserMiddleware from '@middlewares/express/parser.middleware';
import SessionMiddleware from '@middlewares/express/session.middleware';
import ErrorHandlerMiddleware from '@middlewares/express/error.middleware';

import ExpressService from '@services/express.service';
import HttpService from '@services/http.service';
import WebsocketService from '@services/socket.service';

import AuthenticationRouter from '@routes/authentication.route';
import DeviceRouter from '@routes/device.route';

import DevicesListener from '@listeners/devices.listener';

ConsoleUtils.addTimeOnConsole();
ParserUtils.addNewParsers();

dotenv.config();

const port: number = parseInt(process.env.API_PORT || '3131');
const host: string = process.env.API_HOST || 'localhost';

const app = new ExpressService(port);

app.addMiddleware(
	SecurityMiddleware,
	PerformanceMiddleware,
	DebugMiddleware,
	ParserMiddleware,
	SessionMiddleware,
);

app.addRouter(AuthenticationRouter, DeviceRouter);

app.addErrorMiddleware(ErrorHandlerMiddleware);

const http = new HttpService(port, host, app.getApp());

const wss = new WebsocketService(http.getServer());

wss.addListenerRoute(DevicesListener);

http.listen();
