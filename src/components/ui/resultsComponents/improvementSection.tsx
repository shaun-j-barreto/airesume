"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { Lightbulb, Wrench } from "lucide-react";

export function ImprovementSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-[#100120] hover:bg-violet-950/30 transition ease-in-out duration-400 border border-white/10 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-blue-300/10 rounded-full p-2 border border-blue-300/20 shadow-md flex items-center justify-center">
          <Wrench size={30} className="text-blue-300" />
        </div>
        <h2 className="text-blue-200 text-2xl font-semibold p-4 tracking-wide">
          Suggestions for Improvement
        </h2>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-5 text-blue-100">
        {data?.improvement.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 bg-blue-300/5 hover:bg-blue-300/10 w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-blue-300/10 rounded-full p-2 flex items-center justify-center h-fit">
              <Lightbulb size={24} className="text-blue-300" />
            </div>
            <div className="text-blue-100 text-base">{point}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
