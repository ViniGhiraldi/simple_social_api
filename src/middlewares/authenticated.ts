import { RequestHandler } from "express";

export const authenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers
}