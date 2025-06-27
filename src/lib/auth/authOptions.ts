import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../db/mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
