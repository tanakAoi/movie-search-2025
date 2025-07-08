import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async createUser({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          username: user.name ?? null,
          avatar: user.image ?? null,
        },
      });
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.username = user.username ?? null;
        session.user.country = user.country ?? null;
        session.user.avatar = user.avatar ?? user.image ?? null;
        session.user.language = user.language ?? null;
      }
      return session;
    },
  },
};
