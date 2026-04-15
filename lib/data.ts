import { Prisma } from "@prisma/client";
import { startOfDay } from "date-fns";

import { prisma } from "@/lib/prisma";
import { eventFilterSchema } from "@/lib/validations";

const PAGE_SIZE = 6;

export async function getUpcomingEvents(rawFilters: Record<string, string | string[] | undefined>) {
  const filters = eventFilterSchema.parse({
    search: rawFilters.search,
    category: rawFilters.category,
    location: rawFilters.location,
    date: rawFilters.date,
    page: rawFilters.page
  });

  const where: Prisma.EventWhereInput = {
    date: {
      gte: startOfDay(new Date())
    }
  };

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { organizerName: { contains: filters.search, mode: "insensitive" } }
    ];
  }

  if (filters.category) {
    where.category = { contains: filters.category, mode: "insensitive" };
  }

  if (filters.location) {
    where.location = { contains: filters.location, mode: "insensitive" };
  }

  if (filters.date) {
    const date = new Date(filters.date);
    if (!Number.isNaN(date.getTime())) {
      where.date = {
        gte: startOfDay(date),
        lt: new Date(date.getTime() + 1000 * 60 * 60 * 24)
      };
    }
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,
      orderBy: { date: "asc" },
      skip: (filters.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE
    }),
    prisma.event.count({ where })
  ]);

  return {
    events,
    total,
    page: filters.page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE))
  };
}

export async function getFeaturedEvents() {
  return prisma.event.findMany({
    where: {
      date: {
        gte: startOfDay(new Date())
      }
    },
    orderBy: { date: "asc" },
    take: 3
  });
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { bookings: true }
      }
    }
  });
}

export async function getAdminDashboardStats() {
  const [events, users, bookings, revenue] = await Promise.all([
    prisma.event.count(),
    prisma.user.count(),
    prisma.booking.count(),
    prisma.booking.aggregate({
      _sum: {
        quantity: true
      }
    })
  ]);

  return {
    events,
    users,
    bookings,
    ticketsIssued: revenue._sum.quantity ?? 0
  };
}
