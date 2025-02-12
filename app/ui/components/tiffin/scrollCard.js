"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const offers = [
    {
        text: "Get flat 20% off on all orders",
        color: "bg-gradient-to-b from-rustOrange/70 via-rustOrange to-rustOrange/70 rounded-bl-[20px]",
    },
    {
        text: "Free Delivery",
        color: "bg-gradient-to-b from-rustOrange/70 via-rustOrange to-rustOrange/70 rounded-bl-[20px]",
    },
    {
        text: "50% OFF on orders above 229",
        color: "bg-gradient-to-b from-rustOrange/70 via-rustOrange to-rustOrange/70 rounded-bl-[20px]",
    },
    {
        text: "Special Weekend Deals",
        color: "bg-gradient-to-b from-rustOrange/70 via-rustOrange to-rustOrange/70 rounded-bl-[20px]",
    },
    {
        text: "New User Extra 10% OFF",
        color: "bg-gradient-to-b from-rustOrange/70 via-rustOrange to-rustOrange/70 rounded-bl-[20px]",
    },
];

export function AutoScrollCards() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    useEffect(() => {
        if (!isAutoScrolling) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoScrolling]);

    const handlePrevious = () => {
        setIsAutoScrolling(false);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? offers.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setIsAutoScrolling(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    };

    const handleDotClick = (index) => {
        setIsAutoScrolling(false);
        setCurrentIndex(index);
    };

    const handleCardHover = () => {
        setIsAutoScrolling(false);
    };

    const handleCardLeave = () => {
        setIsAutoScrolling(true);
    };

    return (
        <div
            className="relative h-32 w-full overflow-hidden rounded-xl"
            role="region"
            aria-label="Special offers carousel"
        >
            {/* Navigation Buttons */}
            <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-rustOrange/10 hover:bg-rustOrange/20 transition-colors"
                aria-label="Previous offer"
            >
                <ChevronLeft className="h-6 w-6 text-black" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-rustOrange/10 hover:bg-rustOrange/20 transition-colors"
                aria-label="Next offer"
            >
                <ChevronRight className="h-6 w-6 text-black " />
            </button>

            {/* Cards */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            duration: 0.5,
                        }}
                        className={`inline-flex items-center gap-2 rounded-lg ${offers[currentIndex].color} px-6 py-3 text-white shadow-lg cursor-pointer`}
                        onMouseEnter={handleCardHover}
                        onMouseLeave={handleCardLeave}
                        role="group"
                        aria-label={`Offer ${currentIndex + 1} of ${offers.length}`}
                    >
                        <Tag className="h-5 w-5" aria-hidden="true" />
                        <span className="text-sm font-medium whitespace-nowrap">
                            {offers[currentIndex].text}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress indicators */}
            <div
                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2"
                role="tablist"
                aria-label="Offer navigation"
            >
                {offers.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex
                            ? "bg-primary scale-125"
                            : "bg-primary/30 hover:bg-white/50"
                            }`}
                        role="tab"
                        aria-selected={index === currentIndex}
                        aria-label={`Go to offer ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}