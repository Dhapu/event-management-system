import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, UserCircle2 } from "lucide-react";

import { BookingForm } from "@/components/booking-form";
import { auth } from "@/lib/auth";
import { getEventBySlug } from "@/lib/data";
import { formatCurrency, formatEventDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type EventDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  const session = await auth();

  if (!event) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[36px] border border-border/60 bg-card shadow-soft">
        <div className="relative h-[320px]">
          <Image
            src={event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid gap-8 p-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{event.category}</p>
              <h1 className="font-display text-5xl font-semibold">{event.title}</h1>
              <p className="text-lg text-foreground/75">{event.description}</p>
            </div>
            <div className="grid gap-3 rounded-[28px] bg-secondary/60 p-5 text-sm text-foreground/80 sm:grid-cols-2">
              <p>Date: {formatEventDate(event.date)}</p>
              <p>Price: {formatCurrency(event.price.toString())}</p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {event.location}
              </p>
              <p>Venue: {event.venue || "To be announced"}</p>
              <p>Booked seats: {event._count.bookings}</p>
              <p>Capacity: {event.capacity}</p>
            </div>
            <div className="rounded-[28px] border border-border/60 p-5">
              <div className="flex items-center gap-3">
                <UserCircle2 className="h-10 w-10 text-primary" />
                <div>
                  <h2 className="font-semibold">{event.organizerName}</h2>
                  <p className="text-sm text-muted-foreground">{event.organizerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-border/60 bg-background p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Registration</p>
              <p className="mt-3 font-display text-4xl font-semibold">{formatCurrency(event.price.toString())}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Secure your spot now. Tickets come with a QR code and booking history.
              </p>
            </div>
            {session?.user ? (
              <BookingForm eventId={event.id} />
            ) : (
              <div className="rounded-[28px] border border-border/60 bg-card p-5 text-sm text-muted-foreground shadow-soft">
                Log in to book this event and access your ticket instantly from the bookings page.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
