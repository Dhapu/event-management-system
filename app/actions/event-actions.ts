"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/storage";
import { slugify } from "@/lib/utils";
import { eventSchema, type EventActionState } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return session.user;
}

export async function upsertEventAction(
  _: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  await requireAdmin();

  const eventId = formData.get("eventId")?.toString();
  const imageFile = formData.get("imageFile");
  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    date: formData.get("date"),
    location: formData.get("location"),
    venue: formData.get("venue"),
    price: formData.get("price"),
    organizerName: formData.get("organizerName"),
    organizerEmail: formData.get("organizerEmail"),
    excerpt: formData.get("excerpt"),
    capacity: formData.get("capacity"),
    imageUrl: formData.get("imageUrl")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const uploadedImage =
    imageFile instanceof File && imageFile.size > 0 ? await saveUploadedImage(imageFile) : null;

  const payload = {
    title: parsed.data.title,
    slug: slugify(parsed.data.title),
    description: parsed.data.description,
    category: parsed.data.category,
    date: new Date(parsed.data.date),
    location: parsed.data.location,
    venue: parsed.data.venue || null,
    price: parsed.data.price,
    organizerName: parsed.data.organizerName,
    organizerEmail: parsed.data.organizerEmail,
    excerpt: parsed.data.excerpt || null,
    capacity: parsed.data.capacity,
    image: uploadedImage || parsed.data.imageUrl || null
  };

  if (eventId) {
    await prisma.event.update({
      where: { id: eventId },
      data: payload
    });
  } else {
    await prisma.event.create({
      data: payload
    });
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
  return { success: eventId ? "Event updated." : "Event created." };
}

export async function deleteEventAction(eventId: string) {
  await requireAdmin();
  await prisma.event.delete({ where: { id: eventId } });
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}
