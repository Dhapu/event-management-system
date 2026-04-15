import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const userPassword = await bcrypt.hash("User@123", 10);

  const [admin, demoUser] = await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@eventsphere.dev" },
      update: {},
      create: {
        name: "Platform Admin",
        email: "admin@eventsphere.dev",
        password: adminPassword,
        role: "ADMIN"
      }
    }),
    prisma.user.upsert({
      where: { email: "alex@example.com" },
      update: {},
      create: {
        name: "Alex Johnson",
        email: "alex@example.com",
        password: userPassword
      }
    })
  ]);

  await prisma.event.createMany({
    data: [
      {
        slug: "future-of-product-summit",
        title: "Future of Product Summit",
        description:
          "A full-day summit covering AI-assisted product discovery, pricing strategy, and growth loops for digital teams.",
        category: "Conference",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12),
        location: "Bengaluru",
        venue: "Convention Hall A",
        price: 149.0,
        image:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        organizerName: "EventSphere Labs",
        organizerEmail: "hello@eventsphere.dev",
        organizerId: admin.id,
        excerpt: "Strategy, research, and growth leaders in one room.",
        capacity: 250
      },
      {
        slug: "design-systems-live",
        title: "Design Systems Live",
        description:
          "A practical workshop for designers and frontend engineers building accessible component systems at scale.",
        category: "Workshop",
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21),
        location: "Mumbai",
        venue: "Studio Nine",
        price: 79.0,
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
        organizerName: "EventSphere Labs",
        organizerEmail: "hello@eventsphere.dev",
        organizerId: admin.id,
        excerpt: "Ship a stronger design system with less friction.",
        capacity: 120
      }
    ],

  });

  const event = await prisma.event.findFirstOrThrow({
    where: { slug: "future-of-product-summit" }
  });

  await prisma.booking.upsert({
    where: {
      userId_eventId: {
        userId: demoUser.id,
        eventId: event.id
      }
    },
    update: {},
    create: {
      userId: demoUser.id,
      eventId: event.id,
      quantity: 1,
      ticketCode: "TICKET-DEMO-0001"
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
