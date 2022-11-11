import { tables } from '@database';
import Building from '@models/building.model';
import Repository from '@repositories';

class BuildingRepository extends Repository<Building> {
	table = tables.building;
	model = Building;
}

export default new BuildingRepository();
