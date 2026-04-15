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
Dev server: http://localhost:3002 (running)
Admin login: admin@eventsphere.dev / Admin@123
Demo user: alex@example.com / User@123

Enjoy!
