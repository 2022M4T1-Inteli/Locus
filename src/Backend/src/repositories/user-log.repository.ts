import { tables } from '@database';
import UserLog from '@models/user-log.model';
import Repository from '@repositories';

class UserLogRepository extends Repository<UserLog> {
	table = tables.userLog;
	model = UserLog;
}

export default new UserLogRepository();
