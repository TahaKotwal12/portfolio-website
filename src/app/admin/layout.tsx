import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSession } from "@/lib/auth/session";
import { logoutAction } from "@/app/admin/actions";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/admin/dashboard">
            <Logo />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {session && (
              <>
                <span className="hidden font-mono text-xs text-muted sm:inline">
                  {session.email}
                </span>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
                  >
                    <LogOut className="size-3.5" />
                    Log out
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">{children}</main>
    </div>
  );
}
