import { MissingFieldError } from '@errors/controller.error';
import Room from '@models/room.model';
import Laboratory from '@models/laboratory.model';
import Building from '@models/building.model';

export default class ControllerUtils {
	static requireFields(body: any, fields: string[]): any {
		const missingFields = fields.filter((field) => !body[field]);
		if (missingFields.length > 0) {
			throw new MissingFieldError(missingFields[0]);
		}

		return fields.reduce((acc, field) => {
			(acc as any)[field] = body[field];
			return acc;
		}, {});
	}

	static async unpackLocationsToRooms(
		locations: (Room | Laboratory | Building)[],
	): Promise<Room[]> {
		let rooms: Room[] = [];
		let laboratories: Laboratory[] = [];
		let buildings: Building[] = [];

		locations.forEach((location: Room | Laboratory | Building) => {
			if (location instanceof Room) {
				rooms.push(location);
			} else if (location instanceof Laboratory) {
				laboratories.push(location);
			} else if (location instanceof Building) {
				buildings.push(location);
			}
		});

		await Promise.all(
			buildings.map(async (building: Building) => {
				laboratories = laboratories.concat(
					(await building.getLaboratories()) || [],
				);
			}),
		);

		await Promise.all(
			laboratories.map(async (laboratory: Laboratory) => {
				rooms = rooms.concat((await laboratory.getRooms()) || []);
			}),
		);

		return rooms;
	}
}
