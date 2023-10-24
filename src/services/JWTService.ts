import * as jwt from 'jsonwebtoken';

interface IJwtData {
    username: string;
    email: string;
}

export const generateToken = (data: IJwtData, isRefreshToken = false) => {
    if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    const expiresIn = isRefreshToken ? '48h' : '1h';

    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn});
}

export const verifyToken = (token: string) => {
    if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(typeof decoded === 'string') return 'INVALID_TOKEN';

        return decoded as IJwtData;
    } catch (error) {
        return 'INVALID_TOKEN';
    }
}