"use server";

type Role = "USER" | "ADMIN";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


async function requireAdmin() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }
}

export async function updateUserRoleAction(userId: string, role: Role) {
  await requireAdmin();

  await prisma.user.update({
    where: { id: userId },
    data: { role }
  });

  revalidatePath("/admin/users");
}
