"use client";

import { useResumeContext } from "@/context/ResumeContext";

export function ImprovementSection() {
  const { data } = useResumeContext();
  return (
    <div className="bg-[#1F012E] border border-white/10 rounded-xl">
      <ul className="list-disc pl-6 text-purple-100">
        {data?.improvement.map((point: string, index: number) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
