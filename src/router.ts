import { Router, Request, Response } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createProduct, deleteProduct, getOneProduct, getProducts } from "./handlers/product";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
	"/product/:id",
	body("name").isString(),
	handleInputErrors,
	(req: Request, res: Response) => {
		res.status(200);
		res.json({ message: `inside put product now and works` });
	}
);
router.post("/product", body('name').isString(), handleInputErrors, createProduct);
router.delete("/product/:id", deleteProduct);

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
	"/update/:id",
	body("title").optional(),
	body("body").optional(),
	body("status").optional(),
	body("version").optional(),
	() => {}
);
router.post(
	"/update",
	body("title").exists().isString(),
	body("body").exists().isString(),
	// oneOf([body("IN_PROGRESS"), body("SHIPPED"), body("DEPRECATED")]),
	body('status').isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
	body("status").optional(),
	body("version").optional(),
	() => {}
);
router.delete("/update/:id", () => {});

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put(
	"/update/:id",
	body("name").optional().isString(),
	body("description").optional().isString(),
	() => {}
);
router.post(
	"/update",
	body("name").optional().isString(),
	body("description").optional().isString(),
	() => {}
);
router.delete("/update/:id", () => {});

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
	"/updatepoint/:id",
	body("name").optional().isString(),
	body("description").optional().isString(),
	() => {}
);
router.post(
	"/updatepoint",
	body("name").optional().isString(),
	body("description").optional().isString(),
	body('updateId').exists().isString(),
	() => {}
);

export default router;
