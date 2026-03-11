"use client";
import { motion } from "motion/react";
import React from "react";

export const LoaderFive = ({ text }: { text: string }) => {
  return (
    /* Updated background: A warm radial gradient from a light peach to a soft sunset orange.
       Updated text color: Using a deep orange-brown (orange-950) for contrast.
    */
    <div className="fixed bg-orange-50 w-full flex justify-center items-center h-screen text-black font-sans font-bold">
      <div className="flex flex-col items-center">
        <div>
          {text.split("").map((char, i) => (
            <motion.div
              key={i}
              className="inline-block md:text-7xl text-4xl"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.05,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.div>
          ))}
        </div>
        <p className="md:text-lg text-sm text-center md:mt-4 mt-2 text-gray-900">
          Analyzing your resume. This may take up to a minute
        </p>
      </div>
    </div>
  );
};
