import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

function allowedEmails(): string[] {
  return (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    // Only the people on the allowlist get in. Everyone else is bounced
    // at Google's callback, before a session is ever created.
    signIn({ profile }) {
      const email = profile?.email?.toLowerCase();
      if (!email) return false;
      return allowedEmails().includes(email);
    },
    // Used by middleware to gate every page.
    authorized({ auth: session }) {
      return !!session?.user;
    },
  },
  session: {
    strategy: "jwt",
    // Staff stay signed in for a long time — nobody wants to re-auth at 07:30.
    maxAge: 60 * 60 * 24 * 180,
  },
  trustHost: true,
});
