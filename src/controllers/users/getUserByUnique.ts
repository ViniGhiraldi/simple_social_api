import { RequestHandler } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";

export const getUserByUnique: RequestHandler = async (req, res) => {
    const paramsSchema = z.object({
        uniquekey: z.string().toLowerCase()
    })

    const { uniquekey } = paramsSchema.parse(req.params);

    const bodyValidation = z.object({
        posts: z.boolean().default(false),
        follower: z.boolean().default(false),
        followed: z.boolean().default(false),
        comments: z.boolean().default(false),
        options: z.boolean().default(false)
    })

    const { posts, follower, followed, comments, options } = bodyValidation.parse(req.body)

    try {
        const data = await prisma.users.findFirstOrThrow({
            where: {
                OR: [
                    {
                        username: {
                            equals: uniquekey
                        }
                    },
                    {
                        email: {
                            equals: uniquekey
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

        return res.status(StatusCodes.OK).json({data});
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    }
}