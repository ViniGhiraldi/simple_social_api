import { authenticated } from './../middlewares/authenticated';
import { Router } from 'express';
import { usersController, authController, usersFollowsController, postsController, postUserOptionsController, postUserCommentsController } from '../controllers';
import multer from 'multer';
import multerConfig from './../lib/multer/config/multer';

const routes = Router();

//auth
routes.post('/signup', multer(multerConfig).fields([{name: 'profilePicture', maxCount: 1}, {name: 'banner', maxCount: 1}]), authController.signUp);
routes.post('/teste', multer(multerConfig).array('media'), (req, res) => {
    console.log(req.files)
    res.send();
});
routes.post('/signin', authController.signIn);
routes.post('/refreshtoken', authenticated, authController.refreshToken);

//users
routes.get('/users', usersController.getUsers)
routes.get('/user/:uniquekey', usersController.getUserByUnique)
routes.put('/user/:username', authenticated, usersController.updateUser)
routes.delete('/user/:username', authenticated, usersController.deleteUser)

//users-follows
routes.post('/follow', authenticated, usersFollowsController.createFollow)
routes.delete('/follow', authenticated, usersFollowsController.deleteFollow)

//posts
routes.post('/post', multer(multerConfig).array('media'), authenticated, postsController.createPost)
routes.get('/feed/:username', postsController.getFeed)
routes.get('/posts', postsController.getPosts)
routes.get('/posts/:username', postsController.getPostsByUser)
routes.get('/post/:id', postsController.getPostById)
routes.delete('/post/:id', authenticated, postsController.deletePost)

//post-user-options
routes.post('/options', authenticated, postUserOptionsController.createOptions)
routes.put('/options', authenticated, postUserOptionsController.updateOptions)

//post-user-comments
routes.post('/comment', authenticated, postUserCommentsController.createComment)
routes.delete('/comment/:id', authenticated, postUserCommentsController.deleteComment)

export default routes;