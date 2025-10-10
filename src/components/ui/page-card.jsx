import { Card } from "./card";
import { cn } from "@/lib/utils";

export function PageCard({ children, className, ...props }) {
  return (
    <Card
      className={cn(
        "w-full max-w-5xl mx-auto p-8 shadow-2xl bg-white/80 backdrop-blur-sm border-0 rounded-3xl",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

export function SectionCard({
  children,
  className,
  gradient = "from-blue-50 to-purple-50",
  ...props
}) {
  return (
    <div
      className={cn("bg-gradient-to-r p-6 rounded-2xl", gradient, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, icon, className }) {
  return (
    <h3
      className={cn(
        "text-xl font-semibold text-gray-800 mb-4 flex items-center",
        className
      )}
    >
      {icon && <span className="text-blue-500 mr-2">{icon}</span>}
      {children}
    </h3>
  );
}
