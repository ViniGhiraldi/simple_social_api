import { prisma } from '../../lib/prisma';
import { RequestHandler } from "express";
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const getUsers: RequestHandler = async (req, res) => {
    const querySchema = z.object({
        filter: z.string().default(''),
        page: z.string().default('1')
    })

    const { filter, page } = querySchema.parse(req.query);

    const bodyValidation = z.object({
        posts: z.boolean().default(false),
        follower: z.boolean().default(false),
        followed: z.boolean().default(false),
        comments: z.boolean().default(false),
        options: z.boolean().default(false)
    })

    const { posts, follower, followed, comments, options } = bodyValidation.parse(req.body)

    const limit = parseInt(process.env.LIMIT as string)
    const offset = limit * (parseInt(page) - 1)

    try {
        const data = await prisma.users.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                username: 'asc'
            },
            where: {
                OR: [
                    {
                        username: {
                            contains: filter
                        }
                    },
                    {
                        nickname: {
                            contains: filter
                        }
                    }
                ]
            },
            include: {
                _count: true,
                posts: posts,
                followerUser: follower,
                followedUser: followed,
                postComments: comments,
                userPost: options
            }
        })
    
        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }

}