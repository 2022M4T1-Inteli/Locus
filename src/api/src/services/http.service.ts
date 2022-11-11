import { Express } from 'express';

export default class HttpService {
	private http: any;
	private port: number;
	private host: string;
	private server: any;

	constructor(port: number, host: string, app: Express) {
		this.port = port;
		this.host = host;
		this.http = require('http');
		this.server = this.http.createServer(app);
	}

	getServer(): any {
		return this.server;
	}

	listen(): void {
		this.server.listen(this.port, this.host, () => {
			console.log(
				`Server is running on http://${this.host}:${this.port}`,
			);
		});
	}
}
