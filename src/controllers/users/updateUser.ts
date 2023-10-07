import { RequestHandler } from "express";
import { z } from 'zod';

export const updateUser: RequestHandler = async (req, res) => {
    const paramsValidation = z.object({
        username: z.string()
    })

    const { username } = paramsValidation.parse(req.params);

    const bodyValidation = z.object({
        nickname: z.string().min(3).max(30),
        email: z.string().email(),
        password: z.string().min(6),
        profilePicture: z.string().transform(val => JSON.parse(val)),
        banner: z.string().transform(val => JSON.parse(val)),
        description: z.string().optional()
    })

    const user = bodyValidation.parse(req.body);
}