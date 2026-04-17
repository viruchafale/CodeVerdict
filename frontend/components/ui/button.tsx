import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-brand bg-brand px-4 py-2 text-white hover:bg-brandDark",
        outline: "border-line bg-white px-4 py-2 text-text hover:bg-slate-50",
        ghost: "border-transparent bg-transparent px-3 py-2 text-text hover:bg-slate-100"
      },
      size: {
        default: "h-9",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
));

Button.displayName = "Button";

export { Button, buttonVariants };
