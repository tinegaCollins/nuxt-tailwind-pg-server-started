import { readFileSync } from "fs";
import { resolve } from "path";
import prisma from "~/lib/prisma";



export default defineEventHandler(async (event) => {
  const filePath = resolve('./data.json');

  try {
    // Read the JSON file
    const content = readFileSync(filePath, "utf8");
    const data = JSON.parse(content);

    // Iterate through each product and add it to the database
    for (const product of data.data) {
      await prisma.designProduct.create({
        data: {
          name: product.name,
          summary: product.summary,
          identifier: product.name.toLowerCase().replace(/ /g, "-"),
          description: product.description,
          price: product.price,
          inHouseColoured: product.inHouseColoured,
          inHouseBlackWhite: product.inHouseBlackWhite,
          recomendedColouredPrintPrice: product.recomendedColouredPrintPrice,
          recomendedBlackWhitePrintPrice:
            product.recomendedBlackWhitePrintPrice,
          discount: product.discount,
          media: product.media,
          category: product.category,
          subCategory: product.subCategory,
          sizes: product.sizes,
          colors: product.colors,
          ifFeatured: product.ifFeatured,
          ifOffer: product.ifOffer,
          ifNew: product.ifNew,
          ifBest: product.ifBest,
          designAreas: product.designAreas,
        },
      });
    }

    // Return success response
    return {
      statusCode: 200,
      body: { message: "Products added successfully" },
    };
  } catch (error) {
    // Log the error and return a 500 status code
    console.error("Error processing the products:", error);
    throw createError({ statusCode: 500, message: "Failed to add products" });
  }
});
