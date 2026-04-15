"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { sendBookingConfirmationEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { createTicketCode } from "@/lib/utils";
import { bookingSchema, type EventActionState } from "@/lib/validations";

export async function createBookingAction(
  _: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const parsed = bookingSchema.safeParse({
    eventId: formData.get("eventId"),
    quantity: formData.get("quantity")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const event = await prisma.event.findUnique({
    where: { id: parsed.data.eventId }
  });

  if (!event) {
    return { error: "Event not found." };
  }

  const existing = await prisma.booking.findUnique({
    where: {
      userId_eventId: {
        userId: session.user.id,
        eventId: event.id
      }
    }
  });

  if (existing) {
    return { error: "You have already registered for this event." };
  }

  const booking = await prisma.booking.create({
    data: {
      eventId: event.id,
      userId: session.user.id,
      quantity: parsed.data.quantity,
      ticketCode: createTicketCode()
    }
  });

  await sendBookingConfirmationEmail({
    to: session.user.email || "",
    attendeeName: session.user.name || "Attendee",
    eventTitle: event.title,
    ticketCode: booking.ticketCode
  });

  revalidatePath(`/events/${event.slug}`);
  revalidatePath("/bookings");

  return { success: "Booking confirmed. Your ticket is ready." };
}
