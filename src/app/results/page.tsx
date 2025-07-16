"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { useEffect, useState } from "react";

export default function Results() {
  const { data } = useResumeContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    if (data) {
      setLoading(false);
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
        <div className="space-y-4 ">
          <h2 className="text-lg font-semibold">Role: {data.role}</h2>
          <p className="whitespace-pre-wrap text-sm text-purple-100 ">
            {data.score}
          </p>
          <p className="whitespace-pre-wrap text-sm text-purple-100 ">
            {data.strenghts}
          </p>
          <p className="whitespace-pre-wrap text-sm text-purple-100 ">
            {data.missing}
          </p>
          <p className="whitespace-pre-wrap text-sm text-purple-100 ">
            {data.improvement}
          </p>
          <p className="whitespace-pre-wrap text-sm text-purple-100 ">
            {data.ats}
          </p>
        </div>
      ) : (
        <p className="text-red-500">
          No data available. Please analyze a resume first.
        </p>
      )}
    </div>
  );
}
