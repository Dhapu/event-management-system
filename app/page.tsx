import Link from "next/link";
import { ArrowRight, Sparkles, Ticket } from "lucide-react";

import { EventCard } from "@/components/event-card";
import { getFeaturedEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const featuredEvents = [
    {
      id: "1",
      slug: "future-of-product-summit",
      title: "Future of Product Summit",
      description: "A full-day summit covering AI-assisted product discovery, pricing strategy, and growth loops for digital teams.",
      category: "Conference",
      date: new Date(Date.now() + 86400000 * 12),
      location: "Bengaluru",
      venue: "Convention Hall A",
      price: 149.0,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      organizerName: "EventSphere Labs",
      organizerEmail: "hello@eventsphere.dev",
      organizerId: "org_123",
      excerpt: "Strategy, research, and growth leaders in one room.",

      capacity: 250,
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: { bookings: 0 }
    },
    {
      id: "2",
      slug: "design-systems-live",
      title: "Design Systems Live",
      description: "Practical workshop for designers and frontend engineers.",
      category: "Workshop",
      date: new Date(Date.now() + 86400000 * 21),
      location: "Mumbai",
      venue: "Studio Nine",
      price: 79.0,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      organizerName: "EventSphere Labs",
      organizerEmail: "hello@eventsphere.dev",
      organizerId: "org_123",
      excerpt: "Ship a stronger design system.",

      capacity: 120,
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: { bookings: 0 }
    },
    {
      id: "3",
      slug: "ai-ethics-forum",
      title: "AI Ethics Forum",
      description: "Responsible AI deployment workshop.",
      category: "Forum",
      date: new Date(Date.now() + 86400000 * 30),
      location: "Delhi",
      venue: "Forum Hall",
      price: 99.0,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
      organizerName: "EventSphere Labs",
      organizerEmail: "hello@eventsphere.dev",
      organizerId: "org_123",
      excerpt: "Building AI that serves humanity.",

      capacity: 150,
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: { bookings: 0 }
    }
  ];


  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-10 rounded-[36px] bg-mesh p-8 shadow-soft lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm text-foreground/80">
            <Sparkles className="h-4 w-4 text-accent" />
            Trusted by modern event teams
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Launch remarkable events and keep every booking flowing smoothly.
            </h1>
            <p className="max-w-2xl text-lg text-foreground/75">
              EventSphere brings discovery, registration, role-based admin tools, ticket management, and booking insights into one polished full-stack workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/events" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              Explore events
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold">
              Create account
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[28px] border border-border/60 bg-card p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Live snapshot</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-4xl font-semibold">{featuredEvents.length}+</p>
                <p className="text-sm text-muted-foreground">Featured experiences</p>
              </div>
              <div>
                <p className="text-4xl font-semibold">24/7</p>
                <p className="text-sm text-muted-foreground">Admin visibility</p>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-border/60 bg-card p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-secondary p-3">
                <Ticket className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold">Instant ticketing</p>
                <p className="text-sm text-muted-foreground">Booking confirmations, QR tickets, and attendee history included.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Upcoming events</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">What’s happening next</h2>
          </div>
          <Link href="/events" className="text-sm font-semibold text-primary">
            View all events
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
