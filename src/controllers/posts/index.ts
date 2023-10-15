import { getPostsByUser } from './getPostsByUser';
import { getPostById } from './getPostById';
import { getPosts } from './getPosts';
import { createPost } from './createPost';
import { deletePost } from './deletePost';

export const postsController = {
    createPost,
    deletePost,
    getPosts,
    getPostsByUser,
    getPostById
}