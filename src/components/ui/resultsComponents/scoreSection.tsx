"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function GradientDefs() {
  return (
    <>
      <defs>
        <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>

        <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
    </>
  );
}
export function ScoreSection() {
  const { data } = useResumeContext();
  const score = data?.score ?? 0;
  const percentage = (score / 100) * 100;

  const chartData = [
    { name: "score", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  const getGradientId = () => {
    if (percentage >= 80) return "greenGradient";
    if (percentage >= 60) return "orangeGradient";
    return "redGradient";
  };

  return (
    <div className="flex flex-row bg-[#160120] border border-white/10 justify-evenly my-4  m-auto rounded-xl overflow-hidden">
      <div className="relative w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <GradientDefs />

            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
            >
              <Cell fill={`url(#${getGradientId()})`} />
              <Cell fill="#2c2c2cbd" />
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
      <div className="flex flex-col h-[100%] bg-green-600  ml-4">
        <h1 className="text-3xl font-semibold text-purple-100 mt-4">
          Overall Resume Score
        </h1>
        <p className="text-sm text-purple-300">
          This score reflects how well your resume aligns with ATS standards for
          the target role.
        </p>
        <p className="text-sm text-purple-300 mt-2">
          {data?.scoreJustification}
        </p>
      </div>
    </div>
  );
}
