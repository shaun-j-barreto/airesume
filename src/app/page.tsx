import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-purple-700 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-[#0a0114] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <Heading />
      <AnalyzeButton />
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
          "md:text-2xl text-base font-medium text-[#e9d5ff] relative z-20 w-[45%] text-center text-l leading-relaxed"
        )}
      >
        Transform your resume with advanced AI analysis. Get personalized
        insights, ATS optimization, and career recommendations to land your
        dream job.
      </h2>
    </>
  );
}

function AnalyzeButton() {
  return (
    <button className="relative inline-flex h-14 overflow-hidden rounded-lg  mt-15 mb-15 ">
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9b84d2_0%,#242373_50%,#9b84d2_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center border border-[#d8b4fe]/50 rounded-lg bg-gradient-to-r from-[#5b21b6]/70 via-[#9333ea]/60 to-[#c084fc]/70 px-8 py-1 text-xl font-medium text-white backdrop-blur-md">
        <Image
          src="/assets/images/upload.png"
          width={20}
          height={20}
          alt="Upload Icon "
          className="mr-2"
        />
        Analyze Your Resume
      </span>
    </button>
  );
}

function FeatureBadge() {
  const features = [
    { text: "⚡ Instant Analysis" },
    { text: "📋 ATS Optimized" },
    { text: "🔍 Career Insights" },
  ];
  return (
    <div className="md:text-sm text-[#e9d5ff] text-xl font-medium flex flex-wrap gap-10 relative z-20">
      <div className="md:text-sm text-[#e9d5ff] text-xl font-medium flex flex-wrap gap-10 relative z-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#7e22ce]/20 px-3 py-1.5 rounded-4xl border border-[#d8b4fe]/50 shadow-md"
          >
            {feature.text}
          </div>
        ))}
      </div>
    </div>
  );
}
