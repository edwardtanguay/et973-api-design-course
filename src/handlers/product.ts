import { Request, Response } from "express";
import prisma from "../db";

export const getProducts = async (req: any, res: Response) => {
	console.log("in getProducts");
	console.log("id", req.user.id);
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			products: true,
		},
	});

	console.log("user", user);

	if (user) {
		res.status(200);
		res.json({ data: user.products });
	}
};

export const getOneProduct = async (req: any, res: Response) => {
	console.log('in getoneproduct');
	try {
		const id = req.params.id;
		const product = await prisma.product.findUnique({
			where: {
				id,
				belongsToId: req.user.id,
			},
		});

		console.log('product', product);


		if (product) {
			res.status(200);
			res.json({ data: product });
		} else {
			res.status(400);
			res.json({ message: "there was an error" });
		}
	} catch (e) {
		res.status(400);
		res.json({ message: "there was an error" });
	}
};

export const createProduct = async (req: any, res: Response) => {
	try {
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				belongsToId: req.user.id,
			},
		});
		res.status(200);
		res.json({ data: product });
	} catch (e) {
		res.status(400);
		res.json({ message: "there was an error" });
	}
};

export const updateProduct = async (req: any, res: Response) => {
	const updated = await prisma.product.update({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: updated });
};

export const deleteProduct = async (req: any, res: Response) => {
	const deleted = await prisma.product.delete({
		where: {
			id: req.params.id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: deleted });
};
