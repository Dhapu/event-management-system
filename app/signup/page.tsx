import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-90px)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">New account</p>
        <h1 className="font-display text-5xl font-semibold">Start booking and managing events in one place.</h1>
        <p className="max-w-xl text-lg text-foreground/75">
          Create an account to book tickets, receive confirmations, and track everything from a single dashboard.
        </p>
      </div>
      <AuthForm mode="signup" />
    </div>
  );
}
