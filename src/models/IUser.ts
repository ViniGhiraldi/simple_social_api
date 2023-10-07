export interface IUser {
    username: string;
    nickname: string;
    email: string;
    password: string;
    profilePicture: JSON;
    banner: JSON;
    description?: string;
}