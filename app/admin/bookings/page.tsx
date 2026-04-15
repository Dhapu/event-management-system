import { prisma } from "@/lib/prisma";
import { formatEventDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    include: {
      event: true,
      user: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Bookings</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">All registrations</h1>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <article key={booking.id} className="rounded-[28px] border border-border/60 bg-card p-5 shadow-soft">
            <div className="grid gap-3 md:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Attendee</p>
                <p className="mt-2 font-medium">{booking.user.name}</p>
                <p className="text-sm text-muted-foreground">{booking.user.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Event</p>
                <p className="mt-2 font-medium">{booking.event.title}</p>
                <p className="text-sm text-muted-foreground">{formatEventDate(booking.event.date)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Ticket</p>
                <p className="mt-2 font-medium">{booking.ticketCode}</p>
                <p className="text-sm text-muted-foreground">Quantity: {booking.quantity}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Status</p>
                <p className="mt-2 font-medium">{booking.status}</p>
                <p className="text-sm text-muted-foreground">{booking.paymentStatus}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
