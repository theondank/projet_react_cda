import { cn } from "@/lib/utils";

export function MainLayout({ children, className }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <main className={cn("container mx-auto", className)}>{children}</main>
    </div>
  );
}
