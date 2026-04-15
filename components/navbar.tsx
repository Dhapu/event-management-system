import Link from "next/link";
import { CalendarRange, LayoutDashboard, Ticket } from "lucide-react";

import { auth, signOut } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="text-sm font-medium text-foreground/80 transition hover:text-foreground">
        Logout
      </button>
    </form>
  );
}

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <CalendarRange className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold tracking-tight">EventSphere</span>
            <span className="block text-xs uppercase tracking-[0.3em] text-muted-foreground">Curated live experiences</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/events" className="text-sm font-medium text-foreground/80 transition hover:text-foreground">
            Events
          </Link>
          {session?.user ? (
            <>
              <Link href="/bookings" className="text-sm font-medium text-foreground/80 transition hover:text-foreground">
                My Bookings
              </Link>
              {session.user.role === "ADMIN" ? (
                <Link href="/admin" className="text-sm font-medium text-foreground/80 transition hover:text-foreground">
                  Admin
                </Link>
              ) : null}
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session?.user ? (
            <>
              {session.user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  className="hidden items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground sm:inline-flex"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/bookings"
                  className="hidden items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground sm:inline-flex"
                >
                  <Ticket className="h-4 w-4" />
                  My Tickets
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-foreground/80 transition hover:text-foreground">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
