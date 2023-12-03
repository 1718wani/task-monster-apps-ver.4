import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import type { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "~/lib/db";
import type { ClientType } from "~/types/ClientType";
import { type JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
    // EmailProvider({
    //   server: env.EMAIL_SERVER,
    //   from: env.EMAIL_FROM,
    // } as EmailClientType),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    session: ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) => {
      session.user.userId = token.sub;
      session.user.image = token.picture;
      return session;
    },
    redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
