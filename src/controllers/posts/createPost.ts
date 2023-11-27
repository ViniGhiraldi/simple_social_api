import { RequestHandler } from "express";
import { z } from "zod";
import { ImageCreateManyPostMediaInput } from 'Prisma';
import { prisma } from "../../lib/prisma";
import { StatusCodes } from 'http-status-codes';

export const createPost: RequestHandler = async (req, res) => {
    const files = req.files as Express.Multer.File[];
    
    const mediaData = files.map(val => {
        return {name: val.filename, size: val.size, path: val.path, url: `${process.env.IMAGES_URL}/${val.filename}`}
    })

    const bodyValidation = z.object({
        title: z.string(),
        /* userId: z.string().toLowerCase() */
    })

    const post = bodyValidation.parse(req.body)

    try {
        let data;

        if(mediaData.length > 0){
            data = await prisma.posts.create({
                data: {
                    ...post,
                    userId: req.headers.userId as string,
                    media: {
                        createMany: {
                            data: mediaData
                        }
                    }
                },
                include: {
                    _count: true,
                    user: {
                        select: {
                            username: true,
                            nickname: true,
                            profilePicture: true
                        }
                    },
                    media: true
                }
            })
        }else{
            data = await prisma.posts.create({
                data: {
                    ...post,
                    userId: req.headers.userId as string
                },
                include: {
                    _count: true,
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

        return res.status(StatusCodes.CREATED).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}