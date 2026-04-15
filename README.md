# EventSphere

EventSphere is a full-stack Event Management System built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and NextAuth.

## Features

- Public home page with featured upcoming events
- Event listing page with search, filters, pagination, and responsive cards
- Event details page with organizer info and ticket booking
- User signup/login with NextAuth credentials flow
- My Bookings page with QR-code tickets
- Admin dashboard with event analytics
- Admin event create/edit/delete flow
- Image upload support for event covers
- Admin booking management
- Admin user management with role promotion/demotion
- Role-based protection for user and admin routes
- Server actions with Zod validation
- Dark mode toggle
- Optional booking confirmation email via Resend

## Stack

- Next.js 15 App Router + Server Components
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth v5
- Zod

## Project Structure

```text
app/
  actions/
  admin/
  api/
  bookings/
  events/
components/
lib/
prisma/
styles/
types/
```

## Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/event_management"
AUTH_SECRET="replace-with-a-long-random-string"
AUTH_URL="http://localhost:3000"
RESEND_API_KEY=""
EMAIL_FROM="noreply@example.com"
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
```

`RESEND_API_KEY` and Stripe keys are optional. Booking still works without them.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Generate the Prisma client:

```bash
npm run prisma:generate
```

3. Run migrations:

```bash
npx prisma migrate dev --name init
```

4. Seed demo data:

```bash
npm run prisma:seed
```

5. Start the development server:

```bash
npm run dev
```

## Demo Accounts

- Admin: `admin@eventsphere.dev` / `Admin@123`
- User: `alex@example.com` / `User@123`

## Notes

- Uploaded images are stored in `public/uploads`.
- Middleware protects `/bookings` and `/admin`.
- Event discovery uses query-param filters and server-side pagination.
- Confirmation emails are sent only when Resend is configured.
- Stripe env vars are included so payment checkout can be added cleanly without restructuring the app.
