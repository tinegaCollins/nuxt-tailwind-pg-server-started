import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const category: any = query.category || "";
  const subcategory: any = query.subcategory || "";

  try {
    let products;

    if (category === "all") {
      products = await prisma.designProduct.findMany();
    } else if (category == "new") {
      products = await prisma.designProduct.findMany({
        where: {
          ifNew: true,
        },
      });
    } else if (category == "pick") {
      products = await prisma.designProduct.findMany({
        where: {
          ifFeatured: true,
        },
      });
    } else if (category == "best-sellers") {
      products = await prisma.designProduct.findMany({
        where: {
          ifBest: true,
        },
      });
    } else {
      if (subcategory == "") {
        products = await prisma.designProduct.findMany({
          where: {
            category: category,
          },
        });
      }else {
        products = await prisma.designProduct.findMany({
          where: {
            category: category,
            subCategory: subcategory
          },
        });
      }
    }
    return {
      statusCode: 200,
      products,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch products",
    });
  }
});
