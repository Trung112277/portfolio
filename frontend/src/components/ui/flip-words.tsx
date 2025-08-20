"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ANIMATION_DURATIONS } from "@/constant/theme-colors";

interface FlipWordsProps {
  words: readonly string[] | string[];
  duration?: number;
  className?: string;
}

const FlipWords = memo(({
  words,
  duration = ANIMATION_DURATIONS.flip,
  className = "",
}: FlipWordsProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(intervalId);
  }, [words, duration]);

  const wordContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "tween" as const,
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(8px)",
      transition: {
        type: "tween" as const,
        ease: [0.4, 0, 0.6, 1],
        duration: 0.4,
      },
    },
  };

  const currentWord = words[index];

  return (
    <div
      className={`inline-block align-middle overflow-hidden w-full min-w-[180px] md:min-w-[300px] lg:min-w-[420px] leading-none ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block whitespace-nowrap"
        >
          {currentWord.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              variants={letterVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

FlipWords.displayName = "FlipWords";

export { FlipWords };
