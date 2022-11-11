import { tables } from '@database';
import Laboratory from '@models/laboratory.model';
import Repository from '@repositories';

class LaboratoryRepository extends Repository<Laboratory> {
	table = tables.laboratory;
	model = Laboratory;
}

export default new LaboratoryRepository();
