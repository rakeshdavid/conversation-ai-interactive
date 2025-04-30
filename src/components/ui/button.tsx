import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[rgb(var(--color-deep-purple))] to-[rgb(var(--color-teal))] text-white hover:shadow-md hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-[rgb(var(--color-pink))] to-[rgb(var(--color-deep-purple))] text-white hover:shadow-md hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-[rgb(var(--color-teal))] bg-background text-[rgb(var(--color-deep-purple))] hover:bg-[rgba(var(--color-teal),0.1)] hover:border-[rgb(var(--color-deep-purple))] transform hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-gradient-to-r from-[rgba(var(--color-deep-purple),0.8)] to-[rgba(var(--color-teal),0.8)] text-white hover:shadow-md hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-[rgba(var(--color-teal),0.1)] hover:text-[rgb(var(--color-deep-purple))] text-[rgb(var(--color-deep-purple))]",
        link: "text-[rgb(var(--color-teal))] underline-offset-4 hover:text-[rgb(var(--color-deep-purple))] hover:underline",
        maslow: "bg-gradient-to-r from-[rgb(var(--color-deep-purple))] via-[rgb(var(--color-pink))] to-[rgb(var(--color-teal))] text-white hover:shadow-md hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8 font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
