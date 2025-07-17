"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type ScoreProps = {
  score: number;
  maxScore: number;
};

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
        <div className="space-y-4 ">
          <h2 className="text-lg font-semibold">Role: {data.role}</h2>
          <ScoreSection score={data.score} />
          <StrengthSection strength={data.strenghts} />
          <MissingSection missing={data.missing} />
          <ImprovementSection improvement={data.improvement} />
          <AtsSection ats={data.ats} />
        </div>
      ) : (
        <p className="text-red-500">
          No data available. Please analyze a resume first.
        </p>
      )}
    </div>
  );
}

function ScoreSection({ score }: { score: number }) {
  const percentage = (score / 100) * 100;

  const data = [
    { name: "score", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-4">
      <div className="relative w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
            >
              <Cell
                fill={
                  percentage >= 80
                    ? "#22c55e"
                    : percentage >= 60
                    ? "#eab308"
                    : "#ef4444"
                }
              />
              <Cell
                fill={
                  percentage >= 80
                    ? "#093e1c"
                    : percentage >= 60
                    ? "#7e5f02"
                    : "#651c1c"
                }
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`${
              score >= 80
                ? "text-green-500"
                : score >= 60
                ? "text-yellow-500"
                : "text-red-500"
            } text-6xl font-bold `}
          >
            {score}
          </span>
        </div>
      </div>
      <p className="text-sm text-purple-300 mt-2">ATS Compatibility Score</p>
    </div>
  );
}

function StrengthSection({ strength }: { strength: string[] }) {
  return (
    <ul className="list-disc pl-6 text-purple-100">
      {strength.map((point: string, index: number) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
}
function MissingSection({ missing }: { missing: string[] }) {
  return (
    <ul className="list-disc pl-6 text-purple-100">
      {missing.map((point: string, index: number) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
}
function ImprovementSection({ improvement }: { improvement: string[] }) {
  return (
    <ul className="list-disc pl-6 text-purple-100">
      {improvement.map((point: string, index: number) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
}
function AtsSection({ ats }: { ats: string[] }) {
  return (
    <ul className="list-disc pl-6 text-purple-100">
      {ats.map((point: string, index: number) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
}
