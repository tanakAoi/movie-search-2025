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
      if (user) {
        token.id = user.id;
        token.username = user.username ?? null;
        token.country = user.country ?? null;
        token.avatar = user.avatar ?? user.image ?? null;
        token.language = user.language ?? null;
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
