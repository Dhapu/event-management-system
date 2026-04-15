import { redirect } from "next/navigation";

import { BookingCard } from "@/components/booking-card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { event: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">My bookings</p>
        <h1 className="font-display text-5xl font-semibold">Your confirmed tickets</h1>
        <p className="text-foreground/75">Every confirmed registration lives here, complete with your QR ticket code.</p>
      </div>

      <div className="space-y-5">
        {bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
        {bookings.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-border p-10 text-center text-muted-foreground">
            No bookings yet. Explore events to reserve your next experience.
          </div>
        ) : null}
      </div>
    </div>
  );
}
