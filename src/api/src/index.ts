import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 5 * 60 * 1000, max: 100 }));

app.get('/', (req: Request, res: Response) => {
	res.send('Ok');
});

const server = app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
