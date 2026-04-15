# Event Management System

## Setup Complete - Dev Server Running

✅ Dev server EPERM spawn error fixed (clean npm install).

✅ SQLite schema configured for local dev.

## Remaining Setup (Antivirus Lock)
Prisma generate/migrate fails due to Windows EPERM on query_engine-windows.dll.node.

**Fix:**
1. Windows Defender > Virus & threat > Manage settings > Add exclusion > Folder > `d:/Next.js/event-management-system`
2. Run `npx prisma generate`
3. `npx prisma migrate dev --name init`
4. `tsx prisma/seed.ts` (demo data)
5. Refresh http://localhost:3002

## Quick Start
Dev: `npm run dev` → http://localhost:3000
Admin: admin@eventsphere.dev / Admin@123
Demo: alex@example.com / User@123

## Production Deploy (Vercel/Netlify)
1. Push to GitHub → Auto-deploy.
2. Vercel Env Vars (from .env.example):
   - DATABASE_URL: Neon/Supabase Postgres
   - NEXTAUTH_SECRET: `openssl rand -base64 32`
   - NEXTAUTH_URL: https://your-app.vercel.app
3. Run `npx prisma db push` (schema to prod DB)
4. Redeploy.

Enjoy!

