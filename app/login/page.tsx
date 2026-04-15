import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-90px)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Account access</p>
        <h1 className="font-display text-5xl font-semibold">Pick up right where your events left off.</h1>
        <p className="max-w-xl text-lg text-foreground/75">
          Sign in to manage registrations, review upcoming plans, and keep your event operations organized.
        </p>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
