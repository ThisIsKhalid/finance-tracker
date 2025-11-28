import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto max-w-[1440px] px-4 @sm:px-6 @lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
