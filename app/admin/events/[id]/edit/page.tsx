import { notFound } from "next/navigation";

import { EventForm } from "@/components/event-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type EditEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Update</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Edit event</h1>
      </div>
      <EventForm event={event} />
    </div>
  );
}
