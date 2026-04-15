"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction, signupAction } from "@/app/actions/auth-actions";
import { SubmitButton } from "@/components/submit-button";
import type { AuthActionState } from "@/lib/validations";

type AuthFormProps = {
  mode: "login" | "signup";
};

const initialState: AuthActionState = {};

export function AuthForm({ mode }: AuthFormProps) {
  const action = mode === "login" ? loginAction : signupAction;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-[32px] border border-border/60 bg-card p-8 shadow-soft">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-semibold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="text-sm text-muted-foreground">
          {mode === "login"
            ? "Log in to manage bookings, save your tickets, and access event updates."
            : "Join EventSphere to discover, book, and manage your live event experience."}
        </p>
      </div>

      {mode === "signup" ? (
        <input
          type="text"
          name="name"
          placeholder="Full name"
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
          required
        />
      ) : null}

      <input
        type="email"
        name="email"
        placeholder="Email address"
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
        required
      />

      {state.error ? <p className="text-sm text-danger">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-emerald-600">{state.success}</p> : null}

      <SubmitButton className="w-full">{mode === "login" ? "Login" : "Create account"}</SubmitButton>

      <p className="text-sm text-muted-foreground">
        {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
        <Link href={mode === "login" ? "/signup" : "/login"} className="font-semibold text-primary">
          {mode === "login" ? "Sign up" : "Login"}
        </Link>
      </p>
    </form>
  );
}
