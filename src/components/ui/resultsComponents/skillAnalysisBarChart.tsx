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
  LabelList,
} from "recharts";
import { ChartNoAxesCombined } from "lucide-react";

export default function SkillAnalysisBarChart() {
  const { data } = useResumeContext();

  return (
    <div className="w-full h-[550px] border border-gray-800/10 bg-background hover:bg-orange-50/60 transition ease-in-out duration-400 shadow-sm rounded-xl p-6 flex flex-col">
      <div className="flex items-center mb-6 w-full max-w-3xl">
        <div className="bg-gray-900 rounded-full p-2 shadow-md flex items-center justify-center">
          <ChartNoAxesCombined size={30} className="text-orange-200" />
        </div>
        <h2 className="text-gray-900 text-2xl font-semibold p-4 tracking-wide">
          Skill Analysis
        </h2>
      </div>

      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data?.skillsAnalysis}
            margin={{
              top: 20,
              right: 20,
              left: -20, // Negative left margin pulls the Y-axis closer to the edge
              bottom: 0,
            }}
          >
            {/* Added subtle horizontal grid lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="skill"
              tick={false} // Hides the text labels at the bottom
              axisLine={{ stroke: "#374151", strokeWidth: 2 }} // Visible X-axis line
            />

            <YAxis
              axisLine={{ stroke: "#374151", strokeWidth: 2 }} // Visible Y-axis line
              tick={{ fill: "#6b7280", fontSize: 12 }} // Shows 0, 20, 40, etc.
              domain={[0, 100]}
              tickCount={6}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />

            <Bar
              dataKey="score"
              fill="#F4BB44"
              radius={[4, 4, 0, 0]}
              activeBar={
                <Rectangle fill="orange" stroke="#1f2937" strokeWidth={1} />
              }
            >
              <LabelList
                dataKey="skill"
                position="insideBottom"
                angle={-90}
                offset={20}
                fill="#1f2937"
                fontSize={12}
                fontWeight={700}
                style={{ textAnchor: "start", pointerEvents: "none" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-orange-200/50 rounded-lg p-3 shadow-xl">
        <p className="text-white font-medium mb-1">{label}</p>
        <p className="text-orange-300 text-sm">
          Score: <span className="font-bold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};
