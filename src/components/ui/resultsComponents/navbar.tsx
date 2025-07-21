"use client";

import { MoveLeft } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-purple-500/10 backdrop-blur-xl border-b border-purple-100/20 p-4  fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="container mx-auto flex gap-5 items-center">
        <button className=" cursor-pointer font-medium border flex flex-row justify-center items-center gap-2 border-purple-300/40 hover:bg-violet-300 hover:text-black px-2 py-1 rounded-md">
          <MoveLeft size={20} />
          Back to Upload
        </button>
        <div className="flex-1 flex flex-col ">
          <h1 className="text-purple-200 text-2xl font-bold">
            Parse Mint Resume Analyzer Results
          </h1>
          <span className="text-sm text-neutral-300">
            Analysis completed on 21/07/2025
          </span>
        </div>
      </div>
    </nav>
  );
}
