"use client";
﻿import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans tracking-[0.2em] uppercase transition-all duration-500 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        luxury: "bg-astera-900 text-white hover:bg-astera-700 shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-0.5",
        luxuryOutline: "bg-transparent text-astera-900 border border-black/10 hover:border-astera-900 hover:bg-black/5",
        glass: "bg-white/10 text-white border border-white/30 backdrop-blur-md hover:bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
        ghost: "bg-transparent text-astera-900 hover:bg-black/5",
        white: "bg-white text-astera-900 hover:bg-astera-50 hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)]",
      },
      size: {
        default: "py-4 px-10 text-[0.7rem] font-bold rounded-[2px]",
        lg: "py-6 px-16 text-[0.75rem] font-bold rounded-[2px]",
        xl: "py-6 px-20 md:px-24 text-[0.75rem] font-bold rounded-[2px]",
        sm: "py-2 px-6 text-[0.65rem] font-semibold rounded-[2px]",
        pill: "py-4 px-10 text-[0.7rem] font-bold rounded-full",
        pillLg: "py-6 px-20 md:px-24 text-[0.75rem] font-bold rounded-full",
      },
    },
    defaultVariants: {
      variant: "luxury",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

