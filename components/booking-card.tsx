import QRCode from "qrcode";
import { Booking, Event } from "@prisma/client";

import { formatEventDate } from "@/lib/utils";

type BookingWithEvent = Booking & {
  event: Event;
};

type BookingCardProps = {
  booking: BookingWithEvent;
};

export async function BookingCard({ booking }: BookingCardProps) {
  const qrCode = await QRCode.toDataURL(booking.ticketCode);

  return (
    <article className="grid gap-6 rounded-[28px] border border-border/60 bg-card p-6 shadow-soft md:grid-cols-[1fr_auto]">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{booking.status}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{booking.event.title}</h3>
        </div>
        <div className="grid gap-2 text-sm text-foreground/80 sm:grid-cols-2">
          <p>Date: {formatEventDate(booking.event.date)}</p>
          <p>Location: {booking.event.location}</p>
          <p>Tickets: {booking.quantity}</p>
          <p>Ticket code: {booking.ticketCode}</p>
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-background p-4">
        <img src={qrCode} alt={`QR code for ${booking.ticketCode}`} className="h-36 w-36 rounded-2xl" />
      </div>
    </article>
  );
}
