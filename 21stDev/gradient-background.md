# Background Gradient Animation Component Integration Guide

## Overview

This guide outlines the process for integrating the `BackgroundGradientAnimation` React component into your codebase. This component creates an interactive, animated gradient background effect.

## Project Requirements

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- TypeScript

## Setup Instructions

### If your project doesn't have these requirements:

1. **Set up shadcn/ui:**
   ```bash
   npx create-next-app@latest my-app --typescript --tailwind --eslint
   cd my-app
   npx shadcn-ui@latest init
   ```

2. **Install Tailwind CSS** (if not already installed):
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Set up TypeScript** (if not already set up):
   ```bash
   npm install -D typescript @types/react @types/node
   ```

### Component Structure

Ensure you have the following folder structure:
```
/components
  /ui
    background-gradient-animation.tsx
/lib
  utils.ts
```

If the `/components/ui` folder doesn't exist, create it. This folder is important for organizing your UI components according to the shadcn structure, making them easily discoverable and maintainable.

## Component Integration

### Step 1: Copy the Component Files

1. Create the file `components/ui/background-gradient-animation.tsx` and copy the component code:

```tsx
"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-70`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100`
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
```

### Step 2: Create a Demo Component

Create a demo component to showcase the `BackgroundGradientAnimation` component:

```tsx
// components/demo/background-gradient-animation-demo.tsx
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export function BackgroundGradientAnimationDemo() {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Gradients X Animations
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
}
```

### Step 3: Add Required Animations to Tailwind Config

The component uses custom animations. Add these to your `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  // ...existing config
  theme: {
    extend: {
      // ...existing theme extensions
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 50s reverse infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": { transform: "translateX(-50%) translateY(-10%)" },
          "50%": { transform: "translateX(50%) translateY(10%)" },
          "100%": { transform: "translateX(-50%) translateY(-10%)" },
        },
        moveInCircle: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        moveVertical: {
          "0%": { transform: "translateY(-50%)" },
          "50%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
    },
  },
  // ...
};
```

### Step 4: Ensure `cn` Utility Is Available

The component uses the `cn` utility function from `@/lib/utils`. Make sure this file exists:

```tsx
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

If you don't have this file, install the required dependencies:

```bash
npm install clsx tailwind-merge
```

## Component Analysis

### Component Props

The `BackgroundGradientAnimation` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gradientBackgroundStart` | string | `"rgb(108, 0, 162)"` | Starting color for the background gradient |
| `gradientBackgroundEnd` | string | `"rgb(0, 17, 82)"` | Ending color for the background gradient |
| `firstColor` to `fifthColor` | string | Various | RGB values for the gradient colors |
| `pointerColor` | string | `"140, 100, 255"` | RGB value for the interactive pointer color |
| `size` | string | `"80%"` | Size of the gradient elements |
| `blendingValue` | string | `"hard-light"` | CSS blend mode value |
| `children` | React.ReactNode | - | Content to display over the gradient background |
| `className` | string | - | Additional classes for the content container |
| `interactive` | boolean | `true` | Enable/disable interactive pointer effect |
| `containerClassName` | string | - | Additional classes for the outer container |

### State Management

The component manages several pieces of state:
- Cursor position tracking for the interactive effect
- Browser detection for Safari-specific styling

### Usage Recommendations

This component is best used as:
- A full-page background
- A hero section background
- A featured section background

## Example Integration

Here's how to use the component in a page:

```tsx
// app/page.tsx
import { BackgroundGradientAnimationDemo } from "@/components/demo/background-gradient-animation-demo";

export default function Home() {
  return (
    <main>
      <BackgroundGradientAnimationDemo />
    </main>
  );
}
```

For a custom implementation:

```tsx
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function CustomPage() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(25, 25, 25)"
      gradientBackgroundEnd="rgb(8, 24, 65)"
      firstColor="64, 64, 255"
      secondColor="111, 111, 245"
      thirdColor="129, 182, 205"
      interactive={true}
    >
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white">
        <h1 className="text-5xl font-bold">Your Content Here</h1>
      </div>
    </BackgroundGradientAnimation>
  );
}
```

## Responsive Behavior

The component is designed to fill its container (using `h-screen w-screen`). You may need to adjust these classes based on your layout requirements.

## Additional Considerations

- The component uses CSS variables set on the document body. If you have multiple instances of this component, they might interfere with each other.
- For best performance, consider disabling the interactive feature on mobile devices.
- The animations are defined using Tailwind animations. Make sure they are properly configured in your Tailwind config.