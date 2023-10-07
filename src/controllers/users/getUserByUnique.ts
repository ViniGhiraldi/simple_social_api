import { RequestHandler } from "express";
import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";

export const getUserByUnique: RequestHandler = async (req, res) => {
    const paramsSchema = z.object({
        uniquekey: z.string()
    })

    const { uniquekey } = paramsSchema.parse(req.params);

    try {
        const data = await prisma.users.findFirst({
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
                _count: true
            }
        })

        return res.status(StatusCodes.OK).json({data});
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    }
}