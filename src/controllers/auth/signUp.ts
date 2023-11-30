import { RequestHandler } from "express";
import { StatusCodes } from 'http-status-codes';
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { passwordHashed } from '../../services/crypto';

interface IFiles{
    profilePicture?: Express.Multer.File[];
    banner?: Express.Multer.File[];
}

export const signUp: RequestHandler = async (req, res) => {
    const { profilePicture, banner } = req.files as IFiles

    const bodyValidation = z.object({
        username: z.string().min(5).max(20).toLowerCase().trim(),
        nickname: z.string().min(3).max(30).trim(),
        email: z.string().email().toLowerCase().trim(),
        password: z.string().min(6).trim(),
        description: z.string().optional()
    })

    const user = bodyValidation.parse(req.body);

    user.password = await passwordHashed(user.password);

    try {
        let data;

        if(profilePicture && banner){
            data = await prisma.users.create({
                data: {
                    ...user,
                    profilePicture: {
                        create: {
                            name: profilePicture[0].filename,
                            path: profilePicture[0].path,
                            size: profilePicture[0].size,
                            url: `${process.env.IMAGES_URL}/${profilePicture[0].filename}`
                        }
                    },
                    banner: {
                        create: {
                            name: banner[0].filename,
                            path: banner[0].path,
                            size: banner[0].size,
                            url: `${process.env.IMAGES_URL}/${banner[0].filename}`
                        }
                    }
                },
                include: {
                    profilePicture: true,
                    banner: true
                }
            })
        } else if(profilePicture){
            data = await prisma.users.create({
                data: {
                    ...user,
                    profilePicture: {
                        create: {
                            name: profilePicture[0].filename,
                            path: profilePicture[0].path,
                            size: profilePicture[0].size,
                            url: `${process.env.IMAGES_URL}/${profilePicture[0].filename}`
                        }
                    },
                },
                include: {
                    profilePicture: true
                }
            })
        } else if(banner){
            data = await prisma.users.create({
                data: {
                    ...user,
                    banner: {
                        create: {
                            name: banner[0].filename,
                            path: banner[0].path,
                            size: banner[0].size,
                            url: `${process.env.IMAGES_URL}/${banner[0].filename}`
                        }
                    },
                },
                include: {
                    banner: true
                }
            })
        } else{
            data = await prisma.users.create({
                data: {
                    ...user,
                }
            })
        }

        return res.status(StatusCodes.CREATED).json({data: {...data, password: undefined}})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}