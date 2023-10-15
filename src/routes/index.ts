import { Router } from 'express';
import { usersController, authController, usersFollowsController, postsController, postUserOptionsController, postUserCommentsController } from '../controllers';

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
routes.get('/posts', postsController.getPosts)
routes.get('/posts/:username', postsController.getPostsByUser)
routes.get('/post/:id', postsController.getPostById)
routes.delete('/post/:id', postsController.deletePost)

//post-user-options
routes.post('/options', postUserOptionsController.createOptions)
routes.put('/options', postUserOptionsController.updateOptions)

//post-user-comments
routes.post('/comment', postUserCommentsController.createComment)
routes.delete('/comment/:id', postUserCommentsController.deleteComment)

export default routes;