import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const session = await getUserSession(event);
  if (!session) {
    throw createError({ statusCode: 401 });
  }

  let subRole = query.subRole as any;
  if (!subRole) {
    throw createError({ statusCode: 400, message: "Sub-role is required" });
  }

  try {
    await prisma.user.update({
      where: { email: session.email },
      data: {
        subRole,
        onboarded: true,
      },
    });

    return {
      statusCode: 200,
      body: { message: "Sub-role added successfully" },
    };
  } catch (error) {
    // Log the error and return a 500 status code
    console.error("Error processing the sub-role:", error);
    throw createError({ statusCode: 500, message: "Failed to add sub-role" });
  }
});
