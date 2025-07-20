"use client";

import { useResumeContext } from "@/context/ResumeContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function GradientDefs() {
  return (
    <>
      <defs>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff89e" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>

        <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5fff9e" />
          <stop offset="100%" stopColor="#00ff6a" />
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

function getScoreStyle(score: number) {
  if (score === 100) {
    return {
      background: "linear-gradient(90deg, #fef08a, #facc15)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 1px #fde047)",
    };
  } else if (score >= 80) {
    return {
      background: "linear-gradient(90deg, #5fff9e, #00ff6a)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 1px #22c55e)",
    };
  } else if (score >= 60) {
    return {
      background: "linear-gradient(90deg, #ffd166, #ff8800)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 1px #facc15)",
    };
  } else {
    return {
      background: "linear-gradient(90deg, #ff6b6b, #ff1f1f)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      filter: "drop-shadow(0 0 1px #ef4444)",
    };
  }
}

const scoreBadges = [
  {
    label: "Perfect: 100",
    bg: "bg-yellow-500/10",
    text: "text-yellow-200",
    border: "border-yellow-300/20",
  },
  {
    label: "Good: 80+",
    bg: "bg-green-500/10",
    text: "text-green-200",
    border: "border-green-300/20",
  },
  {
    label: "Satisfactory: 60+",
    bg: "bg-orange-500/5",
    text: "text-orange-200",
    border: "border-orange-300/20",
  },
  {
    label: "Bad: 60-",
    bg: "bg-red-500/10",
    text: "text-red-200",
    border: "border-red-300/20",
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
    if (percentage == 100) return "goldGradient";
    if (percentage >= 80) return "greenGradient";
    if (percentage >= 60) return "orangeGradient";
    return "redGradient";
  };

  return (
    <div className="bg-[#160120] border border-white/10 rounded-xl p-6 flex flex-row">
      <div className=" justify-evenly my-5  m-auto rounded-xl overflow-hidden">
        <div className="relative w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <GradientDefs />

              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={100}
                outerRadius={150}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
                filter="url(#neon-glow)"
              >
                <Cell fill={`url(#${getGradientId()})`} />
                <Cell fill="#2a1b3d	" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-black" style={getScoreStyle(score)}>
              {score}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 rounded-xl bg-purple-200/5  ml-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-purple-200  tracking-wide opacity-90">
          Overall Resume:
          <span
            className=" text-4xl font-extrabold ml-1  py-1 px-4 rounded-md tracking-wide"
            style={getScoreStyle(score)}
          >
            {score === 100
              ? "Perfect"
              : score >= 80
              ? "Good"
              : score >= 60
              ? "Satisfactory"
              : "Bad"}
          </span>
        </h1>

        <div className="bg-purple-300/5 text-purple-100  p-4 rounded-md  shadow-sm">
          <p className="text-md leading-relaxed whitespace-pre-line">
            {data?.scoreJustification}
          </p>
        </div>
        <div className="flex flex-row gap-5 flex-wrap">
          {scoreBadges.map((badge, index) => (
            <div
              key={index}
              className={`${badge.bg} ${badge.text} border ${badge.border} shadow-md py-1 px-3 rounded-full`}
            >
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
