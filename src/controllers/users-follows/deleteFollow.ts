import { RequestHandler } from "express";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const deleteFollow: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        follower: z.string(),
        followed: z.string()
    })

    const { follower, followed } = bodyValidation.parse(req.body)

    try {
        await prisma.usersFollows.delete({
            where: {
                followerUserId_followedUserId: {
                    followerUserId: follower,
                    followedUserId: followed
                }
            }
        })

        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}