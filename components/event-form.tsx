"use client";

import { useActionState } from "react";
import { Event } from "@prisma/client";

import { upsertEventAction } from "@/app/actions/event-actions";
import { SubmitButton } from "@/components/submit-button";
import type { EventActionState } from "@/lib/validations";

type EventFormProps = {
  event?: Event;
};

const initialState: EventActionState = {};

export function EventForm({ event }: EventFormProps) {
  const [state, formAction] = useActionState(upsertEventAction, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-[32px] border border-border/60 bg-card p-8 shadow-soft">
      {event ? <input type="hidden" name="eventId" value={event.id} /> : null}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input name="title" defaultValue={event?.title} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea name="description" defaultValue={event?.description} rows={6} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <input name="category" defaultValue={event?.category} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Date</label>
          <input type="datetime-local" name="date" defaultValue={event ? new Date(event.date).toISOString().slice(0, 16) : ""} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Location</label>
          <input name="location" defaultValue={event?.location} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Venue</label>
          <input name="venue" defaultValue={event?.venue ?? ""} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Price</label>
          <input type="number" name="price" min="0" step="1" defaultValue={event?.price.toString()} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Capacity</label>
          <input type="number" name="capacity" min="1" defaultValue={event?.capacity ?? 100} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Organizer name</label>
          <input name="organizerName" defaultValue={event?.organizerName} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Organizer email</label>
          <input type="email" name="organizerEmail" defaultValue={event?.organizerEmail} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" required />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Short excerpt</label>
          <input name="excerpt" defaultValue={event?.excerpt ?? ""} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Image URL</label>
          <input name="imageUrl" defaultValue={event?.image ?? ""} className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Upload image</label>
          <input type="file" name="imageFile" accept="image/*" className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2" />
        </div>
      </div>

      {state.error ? <p className="text-sm text-danger">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
      <SubmitButton>{event ? "Update event" : "Create event"}</SubmitButton>
    </form>
  );
}
