import { getUsers } from './getUsers';
import { updateUser } from './updateUser';
import { deleteUser } from './deleteUser';
import { getUserByUnique } from './getUserByUnique';

export const usersController = {
    getUsers,
    updateUser,
    deleteUser,
    getUserByUnique
}