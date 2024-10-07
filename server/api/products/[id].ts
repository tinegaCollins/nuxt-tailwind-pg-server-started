import prisma from "~/lib/prisma";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "GET") {
    const { id } = getRouterParams(event);
    // Fetch product by ID
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

  if (event.node.req.method === "PUT") {
    const body = await readBody(event);
    const updatedProduct = await prisma.designProduct.update({
      where: {
        id: body.id,
      },
      data: {},
    });
    return { message: "Product updated successfully", product: updatedProduct };
  }

  if (event.node.req.method === "DELETE") {
    const { id } = getRouterParams(event);
    await prisma.designProduct.delete({
      where: {
        id,
      },
    });
    return { message: "Product deleted successfully" };
  }
});
