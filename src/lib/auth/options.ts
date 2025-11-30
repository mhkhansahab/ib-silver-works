import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowlistedEmails = (process.env.ADMIN_EMAILS ??
  "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) {
        return false;
      }
      return allowlistedEmails.includes(email);
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.isAdmin = allowlistedEmails.includes(
          user.email.toLowerCase().trim(),
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

