import { IImage } from './IImage';

export interface IUser {
    username: string;
    nickname: string;
    email: string;
    password: string;
    profilePicture?: IImage;
    banner?: IImage;
    description?: string;
}