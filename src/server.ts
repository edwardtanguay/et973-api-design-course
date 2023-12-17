import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import cors from "cors";

export const app = express();

app.use(cors());
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

app.post("/user", createNewUser);
app.post("/signin", signin);

// Express catches synchronous errors
app.get("/test001", (req, res) => {
	throw new Error("test001");
});

// but asynchronous errors crash Express
app.get("/test002", (req, res) => {
	setTimeout(() => {
		throw new Error("test002");
	});
});

// but asynchronous errors crash Express
app.get("/test003", (req, res, next) => {
	setTimeout(() => {
		next(new Error("test003"));
	});
});

// override Express error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.json({ message: 'override of Express error handling' });
});
