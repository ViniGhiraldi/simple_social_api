import { RequestHandler } from "express";
import { generateToken } from "../../services/JWTService";
import { StatusCodes } from "http-status-codes";
import { StatusEnum } from "../../enums/statusEnum";
import { prisma } from "../../lib/prisma";

export const refreshToken: RequestHandler = async (req, res) => {
    const username = req.headers.userId as string
    const email = req.headers.userEmail as string

    const user = await prisma.users.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            nickname: true,
            email: true,
            profilePicture: true,
            description: true,
            banner: true
        }
    })

    const accessToken = generateToken({username: username, email: email});

    const refreshToken = generateToken({username: username, email: email}, true);

    if(accessToken === 'JWT_SECRET_NOT_FOUND' || refreshToken === 'JWT_SECRET_NOT_FOUND') return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {default: StatusEnum.INTERNAL_SERVER_ERROR}});

    return res.status(StatusCodes.OK).json({accessToken, refreshToken, user});
}