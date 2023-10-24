import { RequestHandler } from "express";
import { z } from "zod";
import { generateToken, verifyToken } from "../../services/JWTService";
import { StatusCodes } from "http-status-codes";
import { StatusEnum } from "../../enums/statusEnum";

export const refreshToken: RequestHandler = async (req, res) => {
    const username = req.headers.userId as string
    const email = req.headers.userEmail as string

    const accessToken = generateToken({username: username, email: email});

    const refreshToken = generateToken({username: username, email: email}, true);

    if(accessToken === 'JWT_SECRET_NOT_FOUND' || refreshToken === 'JWT_SECRET_NOT_FOUND') return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {default: StatusEnum.INTERNAL_SERVER_ERROR}});

    return res.status(StatusCodes.OK).json({accessToken, refreshToken});
}