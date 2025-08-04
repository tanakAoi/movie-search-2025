import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../db/prisma";
import EmailProvider from "next-auth/providers/email";
import { sendVerificationRequest } from "./sendVerificationRequest";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM!,
      sendVerificationRequest: async ({ identifier, url }) => {
        await sendVerificationRequest({
          identifier,
          url,
          from: process.env.EMAIL_FROM!,
        });
      },
    }),
    CredentialsProvider({
      id: "guest",
      name: "Guest Login",
      credentials: {},
      async authorize() {
        const guestEmail = "guest@example.com";

        let user = await prisma.user.findUnique({
          where: { email: guestEmail },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: guestEmail,
              name: "Guest User",
              username: "guest",
              avatar: null,
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/verify",
  },
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      const userId = user?.id ?? token.id;

      if (!userId) return token;

      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          country: true,
          language: true,
          avatar: true,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.username = dbUser.username ?? null;
        token.country = dbUser.country ?? null;
        token.language = dbUser.language ?? null;
        token.avatar = dbUser.avatar ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string | null;
        session.user.country = token.country as string | null;
        session.user.avatar = token.avatar as string | null;
        session.user.language = token.language as string | null;
      }
      return session;
    },
  },
};
