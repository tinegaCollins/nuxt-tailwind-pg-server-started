declare module "#auth-utils" {
  interface User {
    email: string;
    onBoarded: boolean;
    role: string;
    avatar: string;
  }
}
