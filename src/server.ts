import express from "express";
import router from "./router";
import morgan from "morgan";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
	req.userName = 'james';
	next();
})

app.get("/", (req, res) => {
	res.status(200);
	res.json({ message: "info", userName: req.userName });
});

app.use("/api", router);
