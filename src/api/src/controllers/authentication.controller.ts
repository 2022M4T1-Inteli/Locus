import Controller from '@controllers';
import { Request, Response } from 'express';
import UserRepository from '@repositories/user.repository';
import { compare } from 'bcrypt';
import ControllerUtils from '@utils/controller.util';

export default class AuthenticationController extends Controller {
	static async login(req: Request, res: Response) {
		const { email, password } = ControllerUtils.requireFields(req.body, [
			'email',
			'password',
		]);

		const user = await UserRepository.findByEmail(email);

		if (!user || !user.password) {
			return res.status(404).send();
		}

		if (await compare(password, user.password)) {
			req.session.user = {
				uuid: user.uuid,
			};

			return res.status(200).send();
		}

		return res.status(401).send();
	}

	static async logout(req: Request, res: Response) {
		req.session.destroy((err) => {
			if (err) {
				return res.status(500).send();
			}

			res.send();
		});
	}

	static async session(req: Request, res: Response) {
		res.json({
			session: req.session,
		});
	}
}
