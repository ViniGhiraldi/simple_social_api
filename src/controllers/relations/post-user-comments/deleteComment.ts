import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const deleteComment: RequestHandler = async (req, res) => {
    const paramsValidation = z.object({
        id: z.string().transform(val => parseInt(val))
    })

    const { id } = paramsValidation.parse(req.params)

    try {
        await prisma.postsComments.delete({
            where: {
                id: id
            }
        })

        return res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}