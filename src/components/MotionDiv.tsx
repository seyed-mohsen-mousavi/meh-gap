"use client";

import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type MotionDivProps = HTMLMotionProps<"div">;

const MotionDiv = React.forwardRef<HTMLHeadingElement, MotionDivProps>(
  function MotionDiv({ children, ...props }, ref) {
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    );
  },
);

export { MotionDiv };
