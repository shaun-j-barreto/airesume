"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function GradientDefs() {
  return (
    <>
      <defs>
        {/* We keep these as they are used for the actual Pie Chart fill as requested */}
        <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff89e" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>

        <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#97f8be" />
          <stop offset="100%" stopColor="#11b153" />
        </linearGradient>

        <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#ff8800" />
        </linearGradient>

        <linearGradient id="redGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ff1f1f" />
        </linearGradient>
      </defs>
    </>
  );
}

// Updated: Now returns solid colors instead of gradients
function getScoreStyle(score: number) {
  if (score === 100) {
    return { color: "#fda529" }; // Darker gold/yellow
  } else if (score >= 80) {
    return { color: "#69c984" }; // Solid green
  } else if (score >= 60) {
    return { color: "#eb6b39" }; // Solid orange
  } else {
    return { color: "#d34848" }; // Solid red
  }
}

const scoreBadges = [
  {
    label: "Perfect: 100",
    bg: "bg-amber-400",
    text: "text-yellow-900",
    border: "border-yellow-200",
  },
  {
    label: "Good: 80+",
    bg: "bg-green-400",
    text: "text-green-900",
    border: "border-green-200",
  },
  {
    label: "Satisfactory: 60+",
    bg: "bg-orange-400",
    text: "text-orange-900",
    border: "border-orange-200",
  },
  {
    label: "Bad: 60-",
    bg: "bg-red-400",
    text: "text-red-900",
    border: "border-red-200",
  },
];

export function ScoreSection() {
  const { data } = useResumeContext();
  const score = data?.score ?? 0;
  const percentage = (score / 100) * 100;

  const chartData = [
    { name: "score", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  const getGradientId = () => {
    if (percentage === 100) return "goldGradient";
    if (percentage >= 80) return "greenGradient";
    if (percentage >= 60) return "orangeGradient";
    return "redGradient";
  };

  return (
    <div className="bg-orange-50/50 mb-4 md:mb-10 border-1 border-gray-800/10  rounded-xl p-2 md:p-6 flex md:flex-row flex-col shadow-sm">
      <div className="justify-evenly my-5 m-auto rounded-xl overflow-hidden">
        <div className="relative w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <GradientDefs />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={140} // Slightly thinner ring looks cleaner without blur
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={`url(#${getGradientId()})`} />
                <Cell fill="#f3f4f6" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Solid Color Score */}
            <span className="text-7xl font-black" style={getScoreStyle(score)}>
              {score}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-2 md:p-6 rounded-xl md:ml-4 max-w-3xl">
        <span
          className="md:text-3xl text-xl font-extrabold py-1 px-1 rounded-md tracking-wide"
          style={getScoreStyle(score)}
        >
          {score === 100
            ? "Elite level—you're at the top of the pile!"
            : score >= 80
              ? "Strong profile—you're ready for the shortlist."
              : score >= 60
                ? "Decent start—there's room to stand out more."
                : "Needs work—let's bridge those gaps."}
        </span>

        <div
          className={`${score === 100 ? "bg-amber-300" : score >= 80 ? "bg-green-300" : score >= 60 ? "bg-orange-300" : "bg-red-300"} text-gray-900 p-5 rounded-lg leading-relaxed shadow-xs`}
        >
          <p className="md:text-lg text-sm whitespace-pre-line">
            {data?.scoreJustification}
          </p>
        </div>

        <div className="flex flex-row md:gap-5 gap-2 flex-wrap mt-2">
          {scoreBadges.map((badge, index) => (
            <div
              key={index}
              className={`${badge.bg} ${badge.text} border ${badge.border} md:text-sm text-xs py-0.5 px-3 rounded-full font-medium`}
            >
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
