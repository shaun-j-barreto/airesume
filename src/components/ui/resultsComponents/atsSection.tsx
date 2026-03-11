"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { FileCheck2, SlidersHorizontal } from "lucide-react";

export function AtsSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-background hover:bg-green-50 transition ease-in-out duration-400  border-1 border-gray-800/10 shadow-sm  rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-green-950 rounded-full p-2 border border-green-300 shadow-md flex items-center justify-center">
          <SlidersHorizontal size={30} className="text-green-300" />
        </div>
        <h2 className="text-gray-700 text-2xl font-semibold p-4 tracking-wide">
          ATS Optimization Tips
        </h2>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-5 text-gray-700">
        {data?.ats.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 bg-green-50 hover:bg-green-100 shadow-md w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-green-900 rounded-full md:p-2 p-1 flex items-center justify-center h-fit">
              <FileCheck2 size={20} className="text-green-300" />
            </div>
            <div className="text-gray-900 flex flex-col justify-center text-sm md:text-base">
              {point}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
