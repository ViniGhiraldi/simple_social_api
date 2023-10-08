import { Router } from 'express';
import { usersController, authController } from '../controllers';

const routes = Router();

//auth
routes.post('/signup', authController.signUp);

//users
routes.get('/users', usersController.getUsers)
routes.get('/user/:uniquekey', usersController.getUserByUnique)
routes.put('/user/:username', usersController.updateUser)
routes.delete('/user/:username', usersController.deleteUser)

export default routes;