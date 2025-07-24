import { useResumeContext } from "@/context/ResumeContext";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartNoAxesCombined } from "lucide-react";

export default function SkillAnalysisBarChart() {
  const { data } = useResumeContext();
  return (
    <div className="relative w-full h-[550px] bg-[#100120] hover:bg-[#1b1729] transition ease-in-out duration-400 border border-white/10 rounded-xl p-4">
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-purple-300/10 rounded-full p-2 border border-purple-300/20 shadow-md flex items-center justify-center">
          <ChartNoAxesCombined size={30} className="text-purple-300" />
        </div>
        <h2 className="text-purple-200 text-2xl font-semibold p-4 tracking-wide">
          Skill Analysis
        </h2>
      </div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="relative -top-2"
      >
        <BarChart
          width={500}
          height={200}
          data={data?.skillsAnalysis}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="0 1" />
          <XAxis
            dataKey="skill"
            angle={0}
            fontSize={12}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="score"
            fill="#a855f7"
            activeBar={<Rectangle fill="#3b0764" stroke="#e9d5ff" />}
            className="transition-all duration-300 "
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-purple-200/50 rounded-lg p-3 shadow-elevated">
        <p className="text-foreground font-medium">{label}</p>
        <p className="text-purple-300">
          Score: <span className="font-semibold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};
