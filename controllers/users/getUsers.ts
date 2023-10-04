import { prisma } from './../../src/lib/prisma';
import { RequestHandler } from "express";
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const getUsers: RequestHandler = async (req, res) => {
    const querySchema = z.object({
        filter: z.string().optional()
    })

    const { filter } = querySchema.parse(req.params);

    const data = await prisma.users.findMany({
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
            _count: true
        }
    })

    console.log(data);

    return res.status(StatusCodes.OK).json(data)
}