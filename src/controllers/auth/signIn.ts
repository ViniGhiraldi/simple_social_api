import { RequestHandler } from "express";
import { z } from "zod";
import { verifyPassword } from "../../services/crypto";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../../services/JWTService";

export const signIn: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        uniquekey: z.string(),
        password: z.string()
    })

    const { uniquekey, password } = bodyValidation.parse(req.body)

    const user = await prisma.users.findFirst({
        where: {
            OR: [
                {
                    username: uniquekey.toLowerCase()
                },
                {
                    email: uniquekey
                }
            ]
        }
    })

    if(!user) return res.status(StatusCodes.UNAUTHORIZED).json({error: {message: 'Usuário ou senha incorreto(s)'}});

    const passwordIsCorrect = await verifyPassword(password, user.password);

    if(!passwordIsCorrect) return res.status(StatusCodes.UNAUTHORIZED).json({error: {message: 'Usuário ou senha incorreto(s)'}});

    const accessToken = generateToken({username: user.username, email: user.email});

    const refreshToken = generateToken({username: user.username, email: user.email}, true);

    if(accessToken === 'JWT_SECRET_NOT_FOUND' || refreshToken === 'JWT_SECRET_NOT_FOUND') return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {message: 'Ocorreu um erro interno no servidor.'}});

    return res.status(StatusCodes.ACCEPTED).json({accessToken, refreshToken});
}