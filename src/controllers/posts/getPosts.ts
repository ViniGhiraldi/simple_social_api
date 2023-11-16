import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const getPosts: RequestHandler = async (req, res) => {
    const queryValidation = z.object({
        filter: z.string().default(''),
        page: z.string().default('1')
    })

    const { filter, page } = queryValidation.parse(req.query)

    const limit = parseInt(process.env.LIMIT as string)
    const offset = limit * (parseInt(page) - 1)

    try {
        const data = await prisma.posts.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                OR: [
                    {
                        userId: {
                            contains: filter
                        }
                    },
                    {
                        title: {
                            contains: filter
                        }
                    }
                ]
            },
            include: {
                _count: true,
                postComments: {
                    orderBy: {
                        id: "desc"
                    }
                },
                postUser: true,
                user: {
                    select: {
                        username: true,
                        nickname: true,
                        profilePicture: true
                    }
                }
            }
        })

        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}