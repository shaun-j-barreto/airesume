"use client";

import { AnalyzeResumeModal } from "@/components/ui/analyze-resume-modal";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-purple-700 flex flex-col items-center justify-center rounded-lg">
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
      <h2
        className={cn(
          "md:text-[120px] text-xl bg-gradient-to-r from-[#cb9cfb] via-[#d8b4fe] to-[#a655f3] bg-clip-text text-transparent relative z-20 font-bold"
        )}
      >
        ParseMint
      </h2>
      <h2
        className={cn(
          "md:text-2xl text-base font-medium text-(--color-text-primary) relative z-20 w-[45%] text-center text-l leading-relaxed"
        )}
      >
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
    <div className="md:text-sm text-(--color-text-primary) text-xl font-medium flex flex-wrap gap-10 relative z-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-[#7e22ce]/20 px-3 py-1.5 rounded-4xl border border-[#d8b4fe]/50 shadow-md"
        >
          {feature.text}
        </div>
      ))}
    </div>
  );
}
