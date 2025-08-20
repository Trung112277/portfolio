'use client';
import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface BouncyTextProps {
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  repeatDelay?: number;
}

const BouncyText = memo(({ 
  text = "Bouncy Animation",
  className = "text-4xl md:text-6xl font-bold text-center",
  delay = 0.1,
  duration = 0.6,
  repeatDelay = 2
}: BouncyTextProps) => {
  // Memoize characters array để tránh split mỗi lần render
  const characters = useMemo(() => text.split(''), [text]);

  return (
    <p className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ y: 0 }}
          animate={{ 
            y: [0, -20, 0],
            transition: {
              delay: i * delay,
              duration,
              repeat: Infinity,
              repeatDelay,
              ease: "easeInOut" as const
            }
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </p>
  );
});

BouncyText.displayName = "BouncyText";

export { BouncyText };