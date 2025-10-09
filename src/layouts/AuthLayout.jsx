import { cn } from "../lib/utils";
import { Outlet } from "react-router-dom";

export function AuthLayout({ className }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className={cn("w-full max-w-md", className)}>
        <Outlet />
      </div>
    </div>
  );
}
