import { RequestHandler } from "express";
import { z } from "zod";
import { verifyPassword } from "../../services/crypto";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../../services/JWTService";
import { StatusEnum } from '../../enums/statusEnum'

export const signIn: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        uniquekey: z.string().min(5).toLowerCase().trim(),
        password: z.string().min(6).trim()
    })

    const { uniquekey, password } = bodyValidation.parse(req.body)

    const user = await prisma.users.findFirst({
        where: {
            OR: [
                {
                    username: uniquekey
                },
                {
                    email: uniquekey
                }
            ]
        },
        select: {
            username: true,
            nickname: true,
            email: true,
            profilePicture: true,
            password: true,
            description: true,
            banner: true,
            _count: true,
            followedUser: true,
            followerUser: true,
            posts: {
                include: {
                    media: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    if(!user) return res.status(StatusCodes.UNAUTHORIZED).json({error: {default: StatusEnum.INVALID_CREDENTIALS}});

    const passwordIsCorrect = await verifyPassword(password, user.password);

    if(!passwordIsCorrect) return res.status(StatusCodes.UNAUTHORIZED).json({error: {default: StatusEnum.INVALID_CREDENTIALS}});

    const accessToken = generateToken({username: user.username, email: user.email});

    const refreshToken = generateToken({username: user.username, email: user.email}, true);

    if(accessToken === 'JWT_SECRET_NOT_FOUND' || refreshToken === 'JWT_SECRET_NOT_FOUND') return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {default: StatusEnum.INTERNAL_SERVER_ERROR}});

    return res.status(StatusCodes.ACCEPTED).json({accessToken, refreshToken, user: {...user, password: undefined}});
}