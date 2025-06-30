import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../db/mongodb";
import { ObjectId } from "mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  events: {
    async createUser({ user }) {
      const client = await clientPromise;
      const db = client.db();
      await db.collection("users").updateOne(
        { _id: new ObjectId(user.id) },
        {
          $set: {
            username: user.name,
            country: "",
            avatar: user.image ?? "",
            language: "",
          },
        }
      );
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
