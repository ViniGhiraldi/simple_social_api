import { prisma } from './../../../lib/prisma';
import { RequestHandler } from "express";
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export const createOptions: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        /* userId: z.string().toLowerCase(), */
        postId: z.number().int(),
        liked: z.boolean().optional(),
        favorited: z.boolean().optional()
    })

    const postUserOptions = bodyValidation.parse(req.body)

    try {
        const data = await prisma.postsUsersOptions.create({
            data: {...postUserOptions, userId: req.headers.userId as string}
        })

        return res.status(StatusCodes.CREATED).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}