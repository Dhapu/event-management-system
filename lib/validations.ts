import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/[0-9]/, "Password must include a number.")
});

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required.")
});

export const eventSchema = z.object({
  title: z.string().min(3, "Title is too short."),
  description: z.string().min(40, "Description should be at least 40 characters."),
  category: z.string().min(2, "Category is required."),
  date: z.string().min(1, "Date is required."),
  location: z.string().min(2, "Location is required."),
  venue: z.string().optional(),
  price: z.coerce.number().min(0, "Price cannot be negative."),
  organizerName: z.string().min(2, "Organizer name is required."),
  organizerEmail: z.string().email("Enter a valid organizer email."),
  excerpt: z.string().max(180).optional(),
  capacity: z.coerce.number().int().min(1, "Capacity must be at least 1."),
  imageUrl: z.string().url("Enter a valid image URL.").optional().or(z.literal(""))
});

export const bookingSchema = z.object({
  eventId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(10)
});

export const eventFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1)
});

export type AuthActionState = {
  error?: string;
  success?: string;
};

export type EventActionState = {
  error?: string;
  success?: string;
};
