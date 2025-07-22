"use client";
import { motion } from "motion/react";
import React from "react";

export const LoaderFive = ({ text }: { text: string }) => {
  return (
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#3b0764,_#1e0e3e,_#0e0014)] flex text-purple-100 justify-center items-center h-screen font-sans font-bold ">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block md:text-7xl text-4xl "
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
        </motion.span>
      ))}
    </div>
  );
};
