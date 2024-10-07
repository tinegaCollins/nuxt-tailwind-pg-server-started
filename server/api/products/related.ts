import { defineEventHandler } from "h3";
import prisma from "~/lib/prisma";
import { Product } from "~/types";

export default defineEventHandler(async (event) => { 
  const query = getQuery(event);

  let category = query.category || ("" as any);

  const related = await prisma.designProduct.findMany({
    where: {
      category: category,
    },
    take: 5
  });

  return related;
});
