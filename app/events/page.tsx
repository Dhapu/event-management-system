import { EventCard } from "@/components/event-card";
import { PaginationControls } from "@/components/pagination-controls";
import { SearchFilters } from "@/components/search-filters";
import { getUpcomingEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

type EventsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolvedSearchParams = await searchParams;
  const { events, page, totalPages } = await getUpcomingEvents(resolvedSearchParams);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Explore</p>
        <h1 className="font-display text-5xl font-semibold">Upcoming events</h1>
        <p className="max-w-2xl text-foreground/75">Browse by category, date, and location to find your next live experience.</p>
      </div>

      <SearchFilters
        defaultValues={{
          search: typeof resolvedSearchParams.search === "string" ? resolvedSearchParams.search : "",
          category: typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : "",
          location: typeof resolvedSearchParams.location === "string" ? resolvedSearchParams.location : "",
          date: typeof resolvedSearchParams.date === "string" ? resolvedSearchParams.date : ""
        }}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <PaginationControls
        page={page}
        totalPages={totalPages}
        pathname="/events"
        searchParams={resolvedSearchParams}
      />
    </div>
  );
}
