import Route from '@routes';
import DeviceController from '@controllers/device.controller';
import { CheckRoleAndPassPermissionMiddleware } from '@middlewares/express/permission.middleware';

const DeviceRouter = new Route('/device');

DeviceRouter.addEndpoint(
	'get',
	'/get_all',
	[], //new CheckRoleAndPassPermissionMiddleware('ADMIN')
	DeviceController.getAll,
);

DeviceRouter.addEndpoint('post', '/locate', [], DeviceController.locate);

export default DeviceRouter;
