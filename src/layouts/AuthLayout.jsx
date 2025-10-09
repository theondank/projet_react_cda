import { cn } from "@/lib/utils";

export function AuthLayout({ children, className }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className={cn("w-full max-w-md", className)}>{children}</div>
    </div>
  );
}
