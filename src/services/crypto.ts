import { compare, genSalt, hash } from "bcryptjs"

const SALT_RANDOMS = 8;

export const passwordHashed = async (password: string) => {
    const salt = await genSalt(SALT_RANDOMS);
    return await hash(password, salt);
}

export const verifyPassword = async (password: string, hash: string) => {
    return await compare(password, hash);
}