"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";

export const MotionLink = motion(
  forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(
    function LinkComponent(props, ref) {
      return <a ref={ref} {...props} />;
    }
  )
);
