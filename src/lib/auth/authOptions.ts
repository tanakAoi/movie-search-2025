import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../db/mongodb";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async createUser({ user }) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL}/user-register`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id, name: user.name }),
          }
        );
        if (!res.ok) {
          const text = await res.text();
          console.error("API error:", res.status, text);
        }
      } catch (err) {
        console.error("Failed to call external API:", err);
      }
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
