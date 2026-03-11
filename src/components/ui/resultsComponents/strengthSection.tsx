"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { ShieldPlus, ShieldCheck } from "lucide-react";

export function StrengthSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-backgorund hover:bg-purple-50 transition ease-in-out duration-400 border-1 border-gray-800/10 shadow-sm rounded-xl p-4">
      {/* Section Header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-purple-900 rounded-full p-2 border border-purple-300/20 shadow-md flex items-center justify-center">
          <ShieldPlus size={30} className="text-purple-50" />
        </div>
        <h2 className="text-gray-700 text-3xl font-semibold p-4 tracking-wide">
          Strengths
        </h2>
      </div>

      {/* Strength Points */}
      <div className="flex flex-col gap-3 text-gray-700">
        {data?.strenghts.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 bg-purple-50 shadow-md hover:bg-purple-100 w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-purple-800 rounded-full p-1 md:p-2 flex items-center justify-center h-fit">
              <ShieldCheck size={20} className="text-purple-50" />
            </div>
            <div className="text-gray-900 md:text-md flex flex-col justify-center text-base">
              {point}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
