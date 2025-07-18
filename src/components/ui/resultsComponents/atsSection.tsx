"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { FileCheck2, SlidersHorizontal } from "lucide-react";

export function AtsSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-[#160120] border border-white/10 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-green-300/10 rounded-full p-2 border border-green-300/20 shadow-md flex items-center justify-center">
          <SlidersHorizontal size={30} className="text-green-300" />
        </div>
        <h2 className="text-green-200 text-2xl font-semibold p-4 tracking-wide">
          ATS Optimization Tips
        </h2>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-5 text-green-100">
        {data?.ats.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 bg-green-300/5 w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-green-300/10 rounded-full p-2 flex items-center justify-center h-fit">
              <FileCheck2 size={24} className="text-green-300" />
            </div>
            <div className="text-green-100 text-base">{point}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
