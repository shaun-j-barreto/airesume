"use client";

import { AnalyzeResumeModal } from "@/components/ui/resumeModal/analyze-resume-modal";
import { Boxes } from "@/components/ui/background-boxes";

export default function Home() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-transparent flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-[#fffaf5] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <Heading />
      <AnalyzeResumeModal />
      <FeatureBadge />
    </div>
  );
}

function Heading() {
  return (
    <>
      <h2 className="md:text-[120px] text-7xl tracking-wider bg-gradient-to-r from-[#ff7f3b] via-[#fb923c] to-[#f97316] bg-clip-text text-transparent relative z-20 font-bold">
        Shortlist
      </h2>
      <h2 className="md:text-3xl text-lg md:mt-1 mt-3 font-medium text-gray-900 relative z-20 w-[90%] md:w-[45%] text-center leading-relaxed tracking-wide">
        Skip the pile. Make the list
      </h2>
    </>
  );
}

function FeatureBadge() {
  const features = [
    { text: "⚡ Instant Analysis" },
    { text: "📋 ATS Optimized" },
    { text: "🔍 Career Insights" },
  ];
  return (
    <div className="md:text-base text-gray-900 text-sm font-normal md:font-medium flex flex-wrap gap-2 md:gap-10 relative z-20">
      {features.map((feature, index) => (
        <div
          key={index}
          // Changed to a very light peach background with a soft orange border
          className="bg-orange-100/50 mt-2 md:px-3 px-1 py-1 rounded-full border border-orange-300/50 shadow-sm backdrop-blur-sm"
        >
          {feature.text}
        </div>
      ))}
    </div>
  );
}
