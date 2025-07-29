"use client";

import { motion } from "motion/react";

interface QuoteProps {
  tagline: string;
}

export const Quote = ({ tagline }: QuoteProps) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="italic text-sm md:text-base text-center"
    >
      “{tagline}”
    </motion.p>
  );
};
