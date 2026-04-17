import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-9 w-full rounded border border-line bg-white px-3 text-sm text-text outline-none transition focus:border-brand",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";

export { Input };
