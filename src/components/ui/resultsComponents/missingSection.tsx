"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { AlertTriangle, AlertCircle } from "lucide-react";

export function MissingSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-background hover:bg-orange-50 transition ease-in-out duration-400 border-1 border-gray-800/10 shadow-sm rounded-xl p-4">
      {/* Section header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-orange-950 rounded-full p-2 border  shadow-md flex items-center justify-center">
          <AlertTriangle size={30} className="text-orange-300" />
        </div>
        <h2 className="text-gray-700 text-3xl font-semibold p-4 tracking-wide">
          Missing or Weak Areas
        </h2>
      </div>

      {/* List of missing points */}
      <div className="flex flex-col gap-3 text-gray-700">
        {data?.missing.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 shadow-md bg-orange-50 hover:bg-orange-100 w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-orange-900 rounded-full md:p-2 p-1 flex items-center justify-center h-fit">
              <AlertCircle size={20} className="text-orange-300" />
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
