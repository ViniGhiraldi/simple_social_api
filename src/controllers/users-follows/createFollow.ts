import { prisma } from './../../lib/prisma';
import { RequestHandler } from "express";
import { StatusCodes } from 'http-status-codes';
import { z } from "zod";

export const createFollow: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        follower: z.string(),
        followed: z.string()
    })

    const { follower, followed } = bodyValidation.parse(req.body)

    try {
        const data = await prisma.usersFollows.create({
            data: {
                followerUserId: follower,
                followedUserId: followed
            }
        })

        return res.status(StatusCodes.CREATED).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}