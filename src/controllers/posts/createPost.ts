import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from 'http-status-codes';

export const createPost: RequestHandler = async (req, res) => {
    const bodyValidation = z.object({
        media: z.string().optional().transform(val => val && JSON.parse(val)),
        title: z.string(),
        userId: z.string().toLowerCase()
    })

    const post = bodyValidation.parse(req.body)

    try {
        const data = await prisma.posts.create({
            data: post
        })

        return res.status(StatusCodes.CREATED).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}