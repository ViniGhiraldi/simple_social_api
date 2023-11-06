import { RequestHandler } from "express";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const updateUser: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        nickname: z.string().min(3).max(30),
        email: z.string().email().toLowerCase(),
        password: z.string().min(6),
        profilePicture: z.string().transform(val => JSON.parse(val)),
        banner: z.string().transform(val => JSON.parse(val)),
        description: z.string().optional()
    })
    
    const user = bodyValidation.parse(req.body);
    const username = req.headers.userId as string

    try {
        const data = await prisma.users.update({
            where: {
                username: username
            },
            data: user
        })

        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}