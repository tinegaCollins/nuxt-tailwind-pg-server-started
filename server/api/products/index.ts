import { defineEventHandler } from "h3";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const query = getQuery(event);
    const id: any = query.id || "";

    const product = await prisma.designProduct.findUnique({
      where: {
        identifier: id,
      },
    });
    if (!product) {
      throw createError({ statusCode: 404, message: "Product not found" });
    }
    return product;
  }

  if (event.node.req.method === "POST") {
    const body = await readBody(event);

    if (!body.name || !body.price) {
      throw createError({ statusCode: 400, message: "Invalid product data" });
    }

    const newProduct = await prisma.designProduct.create(body);
    return { message: "Product added successfully", product: newProduct };
  }
});
