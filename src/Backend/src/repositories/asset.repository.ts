import { tables } from '@database';
import Asset from '@models/asset.model';
import Repository from '@repositories';

class AssetRepository extends Repository<Asset> {
	table = tables.asset;
	model = Asset;
}

export default new AssetRepository();
