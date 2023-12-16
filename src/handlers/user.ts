import { Request, Response, NextFunction } from "express";
import prisma from '../db';
import { createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req: Request, res: Response) => {
	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			password: await hashPassword(req.body.password)
		}
	});

	const token = createJWT(user);
	res.json({ token });
}

export const signin = async (req: Request, res: Response) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username
		}
	})
}