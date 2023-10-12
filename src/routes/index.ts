import { Router } from 'express';
import { usersController, authController, usersFollowsController, postsController } from '../controllers';

const routes = Router();

//auth
routes.post('/signup', authController.signUp);

//users
routes.get('/users', usersController.getUsers)
routes.get('/user/:uniquekey', usersController.getUserByUnique)
routes.put('/user/:username', usersController.updateUser)
routes.delete('/user/:username', usersController.deleteUser)

//users-follows
routes.post('/follow', usersFollowsController.createFollow)
routes.delete('/follow', usersFollowsController.deleteFollow)

//posts
routes.post('/post', postsController.createPost)

export default routes;