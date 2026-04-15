import { CalendarRange, Ticket, Users } from "lucide-react";

import { getAdminDashboardStats } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  const items = [
    { label: "Events", value: stats.events, icon: CalendarRange },
    { label: "Bookings", value: stats.bookings, icon: Ticket },
    { label: "Users", value: stats.users, icon: Users }
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Overview</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Admin dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-[28px] border border-border/60 bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-3 text-4xl font-semibold">{item.value}</p>
                </div>
                <div className="rounded-2xl bg-secondary p-3">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <article className="rounded-[32px] border border-border/60 bg-card p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Ticket activity</p>
        <h2 className="mt-3 font-display text-3xl font-semibold">{stats.ticketsIssued} tickets issued</h2>
        <p className="mt-3 max-w-2xl text-foreground/75">
          Use the events, bookings, and users screens to manage event operations, registrations, and attendee visibility from one place.
        </p>
      </article>
    </div>
  );
}
