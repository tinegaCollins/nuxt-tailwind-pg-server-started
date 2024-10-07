import prisma from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  return {
    user: "hello world"
  };
});
