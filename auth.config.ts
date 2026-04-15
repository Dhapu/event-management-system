import type { NextAuthConfig } from "next-auth";

const authConfig = {
  providers: [],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isBookingRoute = nextUrl.pathname.startsWith("/bookings");

      if (isAdminRoute) {
        return auth?.user?.role === "ADMIN";
      }

      if (isBookingRoute) {
        return isLoggedIn;
      }

      return true;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
