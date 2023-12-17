import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

export const app = express();

// app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next) => {
	req.userName = "james";
	next();
});

const nodeDebugger =
	(kind = "quiet") =>
	(_req: Request, _res: Response, next: NextFunction) => {
		next();
	};

app.get("/", nodeDebugger(), (req, res) => {
	res.status(200);
	res.json({ message: "info", userName: req.userName });
});

app.use("/api", protect, morgan("dev"), nodeDebugger("verbose"), router);

app.post('/user', createNewUser);
app.post('/signin', signin);
