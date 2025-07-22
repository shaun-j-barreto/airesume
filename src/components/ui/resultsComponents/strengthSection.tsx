"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { ShieldPlus, ShieldCheck } from "lucide-react";

export function StrengthSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-[#100120] hover:bg-purple-950/30 transition ease-in-out duration-400 border border-white/10 rounded-xl p-4">
      {/* Section Header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-purple-300/10 rounded-full p-2 border border-purple-300/20 shadow-md flex items-center justify-center">
          <ShieldPlus size={30} className="text-purple-300" />
        </div>
        <h2 className="text-purple-200 text-2xl font-semibold p-4 tracking-wide">
          Strengths
        </h2>
      </div>

      {/* Strength Points */}
      <div className="flex flex-col gap-5 text-purple-100">
        {data?.strenghts.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 bg-purple-300/5 hover:bg-purple-300/10 w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-purple-300/10 rounded-full p-1 md:p-2 flex items-center justify-center h-fit">
              <ShieldCheck size={24} className="text-purple-300" />
            </div>
            <div className="text-purple-100 md:text-md text-base">{point}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
