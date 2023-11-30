import { RequestHandler } from "express";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";
import { StatusCodes } from "http-status-codes";

interface IFiles{
    profilePicture?: Express.Multer.File[];
    banner?: Express.Multer.File[];
}

export const updateUser: RequestHandler = async (req, res) => {
    const { profilePicture, banner } = req.files as IFiles;

    const bodyValidation = z.object({
        nickname: z.string().min(3).max(30).trim(),
        email: z.string().email().toLowerCase().trim(),
        password: z.string().min(6).trim(),
        description: z.string().optional()
    })
    
    const user = bodyValidation.parse(req.body);
    const username = req.headers.userId as string

    try {
        let data;

        if(profilePicture && banner){
            data = await prisma.users.update({
                where: {
                    username: username
                },
                data: {
                    ...user,
                    profilePicture: {
                        update: {
                            name: profilePicture[0].filename,
                            path: profilePicture[0].path,
                            size: profilePicture[0].size,
                            url: `${process.env.IMAGES_URL}/${profilePicture[0].filename}`
                        }
                    },
                    banner: {
                        update: {
                            name: banner[0].filename,
                            path: banner[0].path,
                            size: banner[0].size,
                            url: `${process.env.IMAGES_URL}/${banner[0].filename}`
                        }
                    }
                },
                include:{
                    banner: true,
                    profilePicture: true
                }
            })
        }else if(profilePicture){
            data = await prisma.users.update({
                where: {
                    username: username
                },
                data: {
                    ...user,
                    profilePicture: {
                        update: {
                            name: profilePicture[0].filename,
                            path: profilePicture[0].path,
                            size: profilePicture[0].size,
                            url: `${process.env.IMAGES_URL}/${profilePicture[0].filename}`
                        }
                    }
                },
                include:{
                    banner: true,
                    profilePicture: true
                }
            })
        }else if(banner){
            data = await prisma.users.update({
                where: {
                    username: username
                },
                data: {
                    ...user,
                    banner: {
                        update: {
                            name: banner[0].filename,
                            path: banner[0].path,
                            size: banner[0].size,
                            url: `${process.env.IMAGES_URL}/${banner[0].filename}`
                        }
                    }
                },
                include:{
                    banner: true,
                    profilePicture: true
                }
            })
        } else{
            data = await prisma.users.update({
                where: {
                    username: username
                },
                data: {
                    ...user
                },
                include:{
                    banner: true,
                    profilePicture: true
                }
            })
        }

        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
}