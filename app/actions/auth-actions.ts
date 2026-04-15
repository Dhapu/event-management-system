"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";
import { signInSchema, signUpSchema, type AuthActionState } from "@/lib/validations";

export async function loginAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: "/events"
    });
    return { success: "Logged in successfully." };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }

    throw error;
  }
}

export async function signupAction(_: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email }
  });

  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const password = await bcrypt.hash(parsed.data.password, 10);

  await prisma.user.create({
    data: {
      ...parsed.data,
      password
    }
  });

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/events"
  });

  return { success: "Account created successfully." };
}
