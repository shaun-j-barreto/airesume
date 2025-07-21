"use client";

import { AnalyzeResumeModal } from "@/components/ui/resumeModal/analyze-resume-modal";
import { Boxes } from "@/components/ui/background-boxes";

export default function Home() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-transparent flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-[#0a0114] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
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
      <h2 className="md:text-[120px] text-6xl tracking-wide bg-gradient-to-r from-[#b58dde] via-[#d6bbf3] to-[#a655f3] bg-clip-text text-transparent relative z-20 font-bold">
        ParseMint
      </h2>
      <h2 className="md:text-2xl text-sm md:mt-5 mt-4 font-medium text-violet-200 relative z-20 w-[90%] md:w-[45%] text-center leading-relaxed tracking-wide">
        Transform your resume with advanced AI analysis. Get personalized
        insights, ATS optimization, and career recommendations to land your
        dream job.
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
    <div className="md:text-sm text-(--color-text-primary) text-xs font-normal md:font-medium flex flex-wrap gap-2  md:gap-10 relative z-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-[#7e22ce]/20 mt-2 md:px-3 px-1.5 py-1.5 rounded-4xl border border-[#d8b4fe]/50 shadow-md"
        >
          {feature.text}
        </div>
      ))}
    </div>
  );
}
