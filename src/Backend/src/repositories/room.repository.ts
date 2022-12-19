import { tables } from '@database';
import Room from '@models/room.model';
import Repository from '@repositories';

class RoomRepository extends Repository<Room> {
	table = tables.room;
	model = Room;
}

export default new RoomRepository();
