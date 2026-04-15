import Link from "next/link";

import { deleteEventAction } from "@/app/actions/event-actions";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatEventDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Events</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Manage events</h1>
        </div>
        <Link href="/admin/events/new" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Create event
        </Link>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-soft">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Price</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-5 py-4 font-medium">{event.title}</td>
                <td className="px-5 py-4">{formatEventDate(event.date)}</td>
                <td className="px-5 py-4">{event.location}</td>
                <td className="px-5 py-4">{formatCurrency(event.price.toString())}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <Link href={`/admin/events/${event.id}/edit`} className="text-primary">
                      Edit
                    </Link>
                    <form action={deleteEventAction.bind(null, event.id)}>
                      <button type="submit" className="text-danger">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
