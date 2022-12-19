import { tables, enums } from '@database';
import type { User as UserSchema } from '@prisma/client';
import Model from '@models';
import Room from '@models/room.model';
import Laboratory from './laboratory.model';
import Building from './building.model';
import Image from './image.model';
import UserLog from '@models/user-log.model';

export default class User extends Model<UserSchema> {
	protected data: UserSchema | null;
	protected table = tables.user;

	get uuid(): string | null {
		return this.data?.uuid ?? null;
	}

	get username(): string | null {
		return this.data?.username ?? null;
	}

	get email(): string | null {
		return this.data?.email ?? null;
	}

	get password(): string | null {
		return this.data?.password ?? null;
	}

	get role(): typeof enums.Role[keyof typeof enums.Role] | null {
		return this.data?.role ?? null;
	}

	get created_at(): Date | null {
		return this.data?.created_at ?? null;
	}

	get updated_at(): Date | null {
		return this.data?.updated_at ?? null;
	}

	async changePassword(password: string): Promise<void> {
		await this.update({ password });
	}

	async changeRole(
		role: typeof enums.Role[keyof typeof enums.Role],
	): Promise<void> {
		await this.update({ role });
	}

	async changeUsername(username: string): Promise<void> {
		await this.update({ username });
	}

	async changeEmail(email: string): Promise<void> {
		await this.update({ email });
	}

	async getRooms(): Promise<Room[] | null> {
		return await this.getManyRelation('Rooms', Room);
	}

	async getLaboratories(): Promise<Laboratory[] | null> {
		return await this.getManyRelation('Laboratories', Laboratory);
	}

	async getBuildings(): Promise<Building[] | null> {
		return await this.getManyRelation('Buildings', Building);
	}

	async getPermitedLocations(): Promise<(Room | Laboratory | Building)[]> {
		const rooms = (await this.getRooms()) || [];
		const laboratories = (await this.getLaboratories()) || [];
		const buildings = (await this.getBuildings()) || [];

		return [...rooms, ...laboratories, ...buildings];
	}

	async getLogs(): Promise<UserLog[] | null> {
		return await this.getManyRelation('Logs', UserLog);
	}

	async getImage(): Promise<Image | null> {
		return await this.getUniqueRelation('Image', Image);
	}
}
