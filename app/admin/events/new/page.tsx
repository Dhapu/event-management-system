import { EventForm } from "@/components/event-form";

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Create</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Add a new event</h1>
      </div>
      <EventForm />
    </div>
  );
}
