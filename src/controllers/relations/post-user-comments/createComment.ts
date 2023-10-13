import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const createComment: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        userId: z.string().toLowerCase(),
        postId: z.number().int(),
        comment: z.string()
    })

    const comment = bodyValidation.parse(req.body)

    try {
        const data = await prisma.postsComments.create({
            data: comment
        })

        return res.status(StatusCodes.CREATED).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}