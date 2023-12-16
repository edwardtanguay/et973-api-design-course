import jwt from 'jsonwebtoken';

export const createJWT = (user) => {
	const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string);
	return token;
}

export const protect = (req: Express.Request, res: Express.Response) => {
	const bearer = req.
}