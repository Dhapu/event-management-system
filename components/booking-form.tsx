"use client";

import { useActionState } from "react";

import { createBookingAction } from "@/app/actions/booking-actions";
import { SubmitButton } from "@/components/submit-button";
import type { EventActionState } from "@/lib/validations";

type BookingFormProps = {
  eventId: string;
};

const initialState: EventActionState = {};

export function BookingForm({ eventId }: BookingFormProps) {
  const [state, formAction] = useActionState(createBookingAction, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-[28px] border border-border/60 bg-card p-5 shadow-soft">
      <input type="hidden" name="eventId" value={eventId} />
      <div>
        <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
          Tickets
        </label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          min={1}
          max={10}
          defaultValue={1}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
        />
      </div>
      {state.error ? <p className="text-sm text-danger">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}
      <SubmitButton className="w-full">Book now</SubmitButton>
    </form>
  );
}
