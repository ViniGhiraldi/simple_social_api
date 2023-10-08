import { RequestHandler } from "express";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

export const deleteUser: RequestHandler = async (req, res) => {
    const paramsValidation = z.object({
        username: z.string()
    })

    const { username } = paramsValidation.parse(req.params);

    try {
        await prisma.users.delete({
            where: {
                username: username
            }
        })

        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}