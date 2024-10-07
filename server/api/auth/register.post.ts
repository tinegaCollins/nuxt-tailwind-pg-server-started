import { hash } from "bcrypt";
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

  if (alreadyExists)
    return createError({
      statusCode: 403,
      message: "User already exists",
      data: {
        status: 403,
      },
    });
  const hashedPassword = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const { password: _password } = user;

    await clearUserSession(event);

    await setUserSession(event, {
      user: {
        email: user.email,
        onBoarded: user.onboarded,
        role: user.role,
      },
      loggedInAt: new Date(),
    });

    return { success: true, user };
  } catch (error: any) {
    return createError({ statusCode: 500, message: error.message });
  }
});
