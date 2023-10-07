import { UsersCreateInput } from 'Prisma'
import { RequestHandler } from "express";
import { StatusCodes } from 'http-status-codes';
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export const signUp: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        username: z.string().min(3).max(20),
        nickname: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string().min(6),
        profilePicture: z.string().transform(val => JSON.parse(val)),
        banner: z.string().transform(val => JSON.parse(val)),
        description: z.string().optional()
    })

    const user = bodyValidation.parse(req.body);

    try {
        const data = await prisma.users.create({
            data: user as UsersCreateInput
        })

        return res.status(StatusCodes.CREATED).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}