import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    username?: string | null;
    country?: string | null;
    avatar?: string | null;
    language?: string | null;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id?: string;
      username?: string | null;
      country?: string | null;
      avatar?: string | null;
      language?: string | null;
    };
  }
}
