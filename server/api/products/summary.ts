import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    let pick = await prisma.designProduct.findMany({
      where: {
        ifBest: true,
      },
    });
    let suggested = await prisma.designProduct.findMany({
      take: 4,
      orderBy: {
        id: "desc",
      },
    });
    return {
      statusCode: 200,
      suggested,
      pick,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch products",
    });
  }
});
