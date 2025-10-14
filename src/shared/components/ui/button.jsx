import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@utils/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Bouton primaire moderne - Orange
        default: "bg-primary text-white hover:bg-primary/90 shadow-sm",

        // Bouton destructif - Rouge épuré
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",

        // Bouton outline - Bordure neutre
        outline:
          "border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700",

        // Bouton secondaire - Gris clair
        secondary: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",

        // Bouton ghost - Transparent
        ghost: "text-neutral-700 hover:bg-neutral-100",

        // Lien - Texte avec soulignement
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 px-6 has-[>svg]:px-4",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
