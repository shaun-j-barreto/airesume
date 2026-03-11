"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { Lightbulb, Wrench } from "lucide-react";

export function ImprovementSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-background hover:bg-blue-50 transition ease-in-out duration-400  border-1 border-gray-800/10 shadow-sm  rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-blue-950 rounded-full p-2 border border-blue-300/20 shadow-md flex items-center justify-center">
          <Wrench size={30} className="text-blue-300" />
        </div>
        <h2 className="text-gray-700 text-2xl font-semibold p-4 tracking-wide">
          Suggestions for Improvement
        </h2>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-5 text-gray-700">
        {data?.improvement.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 bg-blue-50 shadow-md hover:bg-blue-100 w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-blue-900 rounded-full p-1 md:p-2  flex items-center justify-center h-fit">
              <Lightbulb size={20} className="text-blue-300" />
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
