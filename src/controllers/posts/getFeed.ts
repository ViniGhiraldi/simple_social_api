import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const getFeed: RequestHandler = async (req, res) => {
    const paramsValidation = z.object({
        username: z.string().toLowerCase()
    })

    const { username } = paramsValidation.parse(req.params)

    const queryValidation = z.object({
        onlyfriends: z.string().transform(val => val === 'true' ? true : false).optional()
    })

    const { onlyfriends } = queryValidation.parse(req.query)

    const querySchema = z.object({
        page: z.string().default('1')
    })

    const { page } = querySchema.parse(req.query);

    const limit = parseInt(process.env.LIMIT as string)
    const offset = limit * (parseInt(page) - 1)

    try {
        let data;

        const userFollows = await prisma.usersFollows.findMany({
            take: limit,
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                followerUserId: username
            },
            select: {
                followedUserId: true
            }
        })

        const userFollowsMapped = userFollows.map(val => val.followedUserId)

        if(onlyfriends){
            data = await prisma.posts.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },           
                where: {
                    userId: {
                        in: userFollowsMapped
                    }
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
        }else{
            const followedUsersFollow = await prisma.usersFollows.findMany({
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },
                where: {
                    followerUserId: {
                        in: userFollowsMapped
                    }
                },
                select: {
                    followedUserId: true
                }
            })
    
            const followedUsersFollowMapped = followedUsersFollow.map(val => val.followedUserId).filter(val => val !== username)
    
            data = await prisma.posts.findMany({
                skip: offset,
                take: limit,
                orderBy: {
                    createdAt: "desc"
                },           
                where: {
                    userId: {
                        in: [...userFollowsMapped, ...followedUsersFollowMapped]
                    }
                },
                include: {
                    _count: true,
                    media: true,
                    postComments: {
                        include: {
                            user: {
                                select: {
                                    username: true,
                                    nickname: true,
                                    profilePicture: true
                                }
                            }
                        },
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
        }

        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}