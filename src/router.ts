import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

router.get("/product", (req, res) => {
	res.status(200);
	res.json({ message: "getting all products" });
});
router.get("/product/:id", () => {});
router.put(
	"/product/:id",
	body("name").isString(),
	handleInputErrors,
	(req: Request, res: Response) => {
		res.status(200);
		res.json({ message: `inside put product now and works` });
	}
);
router.post("/product", () => {});
router.delete("/product/:id", (req, res) => {
	const id = req.params.id;
	res.status(200);
	res.json({ message: `deleting product ${id}` });
});

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.delete("/update/:id", () => {});

export default router;
