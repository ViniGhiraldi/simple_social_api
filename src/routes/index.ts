import { Router } from 'express';
import { usersController } from '../../controllers';

const routes = Router();

routes.get('/getUsers', usersController.getUsers)

export default routes;