import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Tag } from "lucide-react";
import { Event } from "@prisma/client";

import { formatCurrency, formatEventDate } from "@/lib/utils";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-soft transition hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={
            event.image ||
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80"
          }
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
          {event.category}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-semibold tracking-tight">{event.title}</h3>
          <p className="text-sm text-muted-foreground">{event.excerpt || event.description.slice(0, 110)}...</p>
        </div>
        <div className="space-y-2 text-sm text-foreground/80">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{formatEventDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <span>{formatCurrency(event.price.toString())}</span>
          </div>
        </div>
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
