"use client";

import * as React from "react"
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import { MessageCircle, Phone, PhoneOff } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

type ButtonType = "start" | "join" | "leave";

interface ConversationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType: ButtonType;
    particleCount?: number;
    attractRadius?: number;
}

interface Particle {
    id: number;
    x: number;
    y: number;
}

function ConversationButton({
    buttonType,
    className,
    particleCount = 12,
    attractRadius = 50,
    ...props
}: ConversationButtonProps) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        });
    }, [particlesControl]);

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false);
        await particlesControl.start((i) => ({
            x: particles[i].x,
            y: particles[i].y,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }));
    }, [particlesControl, particles]);

    const getButtonConfig = () => {
        switch (buttonType) {
            case "start":
                return {
                    icon: MessageCircle,
                    text: "Start Conversation",
                    activeText: "Starting...",
                    bgColor: "bg-[#6DC4AD]",
                    hoverColor: "hover:bg-[#60C3AE]",
                    textColor: "text-white",
                    borderColor: "border-[#6DC4AD]",
                    particleColor: "bg-[#6DC4AD]"
                };
            case "join":
                return {
                    icon: Phone,
                    text: "Join Call",
                    activeText: "Joining...",
                    bgColor: "bg-[#469DBB]",
                    hoverColor: "hover:bg-[#3A8CAB]",
                    textColor: "text-white",
                    borderColor: "border-[#469DBB]",
                    particleColor: "bg-[#469DBB]"
                };
            case "leave":
                return {
                    icon: PhoneOff,
                    text: "Leave Call",
                    activeText: "Leaving...",
                    bgColor: "bg-[#D52C2C]",
                    hoverColor: "hover:bg-[#C22727]",
                    textColor: "text-white",
                    borderColor: "border-[#D52C2C]",
                    particleColor: "bg-[#D52C2C]"
                };
        }
    };

    const { icon: Icon, text, activeText, bgColor, hoverColor, textColor, borderColor, particleColor } = getButtonConfig();

    return (
        <Button
            className={cn(
                "min-w-40 relative touch-none",
                bgColor,
                hoverColor,
                textColor,
                "border",
                borderColor,
                "transition-all duration-300",
                className
            )}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            {...props}
        >
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: particles[index].x, y: particles[index].y }}
                    animate={particlesControl}
                    className={cn(
                        "absolute w-1.5 h-1.5 rounded-full",
                        particleColor,
                        "transition-opacity duration-300",
                        isAttracting ? "opacity-100" : "opacity-40"
                    )}
                />
            ))}
            <span className="relative w-full flex items-center justify-center gap-2">
                <Icon
                    className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        isAttracting && "scale-110"
                    )}
                />
                {isAttracting ? activeText : text}
            </span>
        </Button>
    );
}

export { ConversationButton };