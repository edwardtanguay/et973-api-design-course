import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET as string
	);
	return token;
};

export const comparePasswords = (password: string, hash: string) => {
	return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string) => {
	return bcrypt.hash(password, 5);
}

export const protect = (req: any, res: any, next: any) => {
	const bearer = req.headers.authorization;
	if (!bearer) {
		res.status(401);
		res.json({ message: "no token, not authorized" });
	} else {
		const [, token] = bearer.split(" ");
		if (!token) {
			res.json({ message: "not valid bearer" });
		} else {
			try {
				const user = jwt.verify(
					token,
					process.env.JWT_SECRET as string
				);
				req.user = user;
				next();
			} catch (e) {
				res.status(401);
				res.json({ message: "invalid token" });
			}
		}
	}
};
