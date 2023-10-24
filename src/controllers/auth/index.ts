import { refreshToken } from './refreshToken';
import { signIn } from './signIn';
import { signUp } from './signUp';

export const authController = {
    signUp,
    signIn,
    refreshToken
}