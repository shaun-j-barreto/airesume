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

export default function SkillAnalysisBarChart() {
  const { data } = useResumeContext();
  console.log("Skill Analysis Data:", data?.skillsAnalysis);
  return (
    <div className="relative w-full h-[500px] bg-[#100120] hover:bg-[#1b1729] transition ease-in-out duration-400 border border-white/10 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
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
            angle={-45}
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
