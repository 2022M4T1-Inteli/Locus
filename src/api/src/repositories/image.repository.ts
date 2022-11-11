import { tables } from '@database';
import Image from '@models/image.model';
import Repository from '@repositories';

class ImageRepository extends Repository<Image> {
	table = tables.image;
	model = Image;
}

export default new ImageRepository();
