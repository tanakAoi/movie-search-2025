"use client";
import { motion } from "motion/react";
import { forwardRef } from "react";

export const MotionLink = motion.create(
  forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
    function LinkComponent(props, ref) {
      return <a ref={ref} {...props} />;
    }
  )
);
