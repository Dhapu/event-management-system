import Link from "next/link";
import { CalendarRange, LayoutDashboard, Ticket, Users } from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: CalendarRange },
  { href: "/admin/bookings", label: "Bookings", icon: Ticket },
  { href: "/admin/users", label: "Users", icon: Users }
];

export function DashboardSidebar() {
  return (
    <aside className="rounded-[28px] border border-border/60 bg-card p-5 shadow-soft">
      <h2 className="mb-4 font-display text-xl font-semibold">Admin panel</h2>
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
