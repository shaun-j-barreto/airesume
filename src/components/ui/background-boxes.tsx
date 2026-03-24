"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  // Reduced count for better performance and "bigger" feel
  const rows = new Array(20).fill(1);
  const cols = new Array(20).fill(1);

  const colors = [
    "#fed7aa", // orange-200
    "#fdba74", // orange-300
    "#fb923c", // orange-400
    "#f97316", // orange-500
    "#ea580c", // orange-600 (for a deeper "hit" on hover)
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(1) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute -top-1/4 left-1/4 z-0 flex h-full w-full p-4",
        className,
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          // Increased height/width from h-20 w-32 to h-48 w-64
          className="relative h-48 w-64 border-l border-orange-200/50"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `${getRandomColor()}`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              // Match height/width here
              className="relative h-48 w-64 border-t border-r border-orange-200/50"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  // Adjusted positioning for larger scale
                  className="pointer-events-none absolute -top-[12px] -left-[12px] h-6 w-6 stroke-[1px] text-orange-300/60"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);