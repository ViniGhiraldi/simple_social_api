import { prisma } from './../../../lib/prisma';
import { RequestHandler } from "express";
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export const updateOptions: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        userId: z.string().toLowerCase(),
        postId: z.number().int(),
        liked: z.boolean().optional(),
        favorited: z.boolean().optional()
    })

    const { userId, postId, ...postUserOptions } = bodyValidation.parse(req.body)

    try {
        const data = await prisma.postsUsersOptions.update({
            where: {
                userId_postId: {
                    userId: userId,
                    postId: postId
                }
            },
            data: postUserOptions
        })

        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}