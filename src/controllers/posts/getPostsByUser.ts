import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const getPostsByUser: RequestHandler = async (req, res) => {
    const queryValidation = z.object({
        page: z.string().default('1')
    })

    const { page } = queryValidation.parse(req.query)

    const paramsValidation = z.object({
        username: z.string().toLowerCase()
    })

    const { username } = paramsValidation.parse(req.params)

    const limit = parseInt(process.env.LIMIT as string)
    const offset = limit * (parseInt(page) - 1)

    try {
        const data = await prisma.posts.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            where: {
                userId: username
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