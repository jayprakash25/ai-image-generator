import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // prompt: "content",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
callbacks:{
  async session({ session, token }) {
    if (token) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
    }

    return session;
  },
  async jwt({ token, user, account, profile }) {
    if (account?.provider === "google" && profile) {
      token.id = profile.sub;
      token.name = profile.name;
      token.email = profile.email;
      token.picture = profile.image;
    }

    return token;
  },
},
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
