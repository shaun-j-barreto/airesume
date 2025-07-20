"use client";

import { AtsSection } from "@/components/ui/resultsComponents/atsSection";
import { ImprovementSection } from "@/components/ui/resultsComponents/improvementSection";
import { MissingSection } from "@/components/ui/resultsComponents/missingSection";
import { ScoreSection } from "@/components/ui/resultsComponents/scoreSection";
import { StrengthSection } from "@/components/ui/resultsComponents/strengthSection";
import { useResumeContext } from "@/context/ResumeContext";
import { useEffect, useState } from "react";

export default function Results() {
  const { data } = useResumeContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
      console.log("Data loaded:", data);
    }
  }, [data]);

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-4">Results</h1>

      {loading ? (
        <p className="text-purple-400 animate-pulse">
          Analyzing your resume...
        </p>
      ) : data ? (
        <div className="space-y-10 ">
          <h2 className="text-lg font-semibold">Role: {data.role}</h2>
          <ScoreSection />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-10">
              <StrengthSection />
              <ImprovementSection />
            </div>
            <div className="space-y-10">
              <MissingSection />
              <AtsSection />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-red-500">
          No data available. Please analyze a resume first.
        </p>
      )}
    </div>
  );
}
