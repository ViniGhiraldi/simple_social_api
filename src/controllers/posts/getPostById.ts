import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const getPostById: RequestHandler = async (req, res) => {
    const paramsValidation = z.object({
        id: z.string().transform(val => parseInt(val))
    })

    const { id } = paramsValidation.parse(req.params)

    try {
        const data = await prisma.posts.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {
                _count: true,
                postComments: true,
                postUser: true,
            }
        })

        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}