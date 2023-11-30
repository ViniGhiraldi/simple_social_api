import { StatusEnum } from './../enums/statusEnum';
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../services/JWTService";

export const authenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) return res.status(StatusCodes.UNAUTHORIZED).json({error: {default: StatusEnum.UNAUTHORIZED}})

    const [type, token] = authorization.split(' ')

    if(type !== 'Bearer') return res.status(StatusCodes.UNAUTHORIZED).json({error: {default: StatusEnum.UNAUTHORIZED}})

    const tokenResult = verifyToken(token)

    if(typeof tokenResult === "string"){
        if(tokenResult === 'INVALID_TOKEN') return res.status(StatusCodes.UNAUTHORIZED).json({error: {default: StatusEnum.UNAUTHORIZED}})
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: {default: StatusEnum.INTERNAL_SERVER_ERROR}})
    }

    req.headers.userId = tokenResult.username.toLowerCase().trim();
    req.headers.userEmail = tokenResult.email.toLowerCase().trim();

    return next();
}