import prisma from "~/lib/prisma";

export default oauthFacebookEventHandler({
  async onSuccess(event, { user }) {
    let alreadyExists = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (alreadyExists) {
      await setUserSession(event, {
        user: {
          avatar: user.picture,
          onBoarded: alreadyExists.onboarded,
          role: alreadyExists.role,
        },
      });
      return sendRedirect(event, "/app");
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: user.email,
          avatar: user.picture,
          role: "user",
          password: "facebook",
          ifFacebook: true,
        },
      });

      await setUserSession(event, {
        user: {
          avatar: newUser.avatar,
          onBoarded: newUser.onboarded,
          role: newUser.role,
        },
      });
      return sendRedirect(event, "/app");
    }
  },
  onError(event, error) {
    console.error("Facebook OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
