import { Router } from 'express';
import { usersController, authController } from '../controllers';

const routes = Router();

//auth
routes.post('/signup', authController.signUp);

//users
routes.get('/users', usersController.getUsers)
routes.get('/user/:uniquekey', usersController.getUserByUnique)

export default routes;