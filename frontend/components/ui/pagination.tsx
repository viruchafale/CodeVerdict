import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => <nav className={cn("flex justify-center", className)} {...props} />;

const PaginationContent = ({ className, ...props }: React.ComponentProps<"ul">) => <ul className={cn("flex items-center gap-2", className)} {...props} />;

const PaginationItem = ({ className, ...props }: React.ComponentProps<"li">) => <li className={className} {...props} />;

function PaginationLink({
  className,
  isActive,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
  return <button className={cn(buttonVariants({ variant: isActive ? "default" : "outline", size: "sm" }), className)} {...props} />;
}

export { Pagination, PaginationContent, PaginationItem, PaginationLink };
