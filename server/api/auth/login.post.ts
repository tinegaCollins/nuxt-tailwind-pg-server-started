import { compare } from "bcrypt";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  if (!email || !password)
    return createError({
      statusCode: 400,
      message: "Email and password are required",
      data: {
        status: 400,
      },
    });

  let alreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (!alreadyExists)
    return createError({
      statusCode: 403,
      message: "User does not exist",
      data: {
        status: 403,
      },
    });

  // login
  const valid = await compare(password, alreadyExists.password);
  if (!valid)
    return createError({
      statusCode: 401,
      message: "Invalid Password",
      data: {
        status: 401,
      },
    });

  await clearUserSession(event);

  await setUserSession(event, {
    user: {
      email: alreadyExists.email,
      onBoarded: alreadyExists.onboarded,
      role: alreadyExists.role,
    },
    loggedInAt: new Date(),
  });

  return { success: true, user: alreadyExists };
});
