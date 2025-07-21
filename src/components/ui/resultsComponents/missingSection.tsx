"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { AlertTriangle, AlertCircle } from "lucide-react";

export function MissingSection() {
  const { data } = useResumeContext();

  return (
    <div className="bg-[#100120] hover:bg-orange-950/20 transition ease-in-out duration-400 border border-white/10 rounded-xl p-4">
      {/* Section header */}
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-orange-300/10 rounded-full p-2 border border-orange-300/20 shadow-md flex items-center justify-center">
          <AlertTriangle size={30} className="text-orange-300" />
        </div>
        <h2 className="text-orange-200 text-2xl font-semibold p-4 tracking-wide">
          Missing or Weak Areas
        </h2>
      </div>

      {/* List of missing points */}
      <div className="flex flex-col gap-5 text-orange-100">
        {data?.missing.map((point: string, index: number) => (
          <div
            key={index}
            className="flex flex-row gap-3 bg-orange-300/5 hover:bg-orange-300/10 w-full max-w-3xl m-auto p-4 rounded-lg"
          >
            <div className="bg-orange-300/10 rounded-full p-2 flex items-center justify-center h-fit">
              <AlertCircle size={24} className="text-orange-300" />
            </div>
            <div className="text-orange-100 text-base">{point}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
