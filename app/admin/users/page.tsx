import { Role } from "@prisma/client";

import { updateUserRoleAction } from "@/app/actions/admin-actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { bookings: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Users</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Manage users</h1>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-soft">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Bookings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4 font-medium">{user.name}</td>
                <td className="px-5 py-4">{user.email}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span>{user.role}</span>
                    <form action={updateUserRoleAction.bind(null, user.id, user.role === Role.ADMIN ? Role.USER : Role.ADMIN)}>
                      <button type="submit" className="text-primary">
                        {user.role === Role.ADMIN ? "Demote" : "Promote"}
                      </button>
                    </form>
                  </div>
                </td>
                <td className="px-5 py-4">{user._count.bookings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
