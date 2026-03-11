import { useResumeContext } from "@/context/ResumeContext";
import { ChartPie } from "lucide-react";
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#b946f2", "#acccff", "#fcb995", "#fc80d2"];
export default function SkillDistributionPieChart() {
  const { data } = useResumeContext();
  return (
    <div className="relative w-full h-[550px] bg-background border-1 border-gray-800/10 hover:bg-orange-50 transition ease-in-out duration-400 shadow-sm rounded-xl p-4">
      <div className="flex items-center mb-6 w-full max-w-3xl m-auto">
        <div className="bg-gray-800 rounded-full p-2 border shadow-md flex items-center justify-center">
          <ChartPie size={30} className="text-orange-200" />
        </div>
        <h2 className="text-gray-900 text-2xl font-semibold p-4 tracking-wide">
          Skill Distribution
        </h2>
      </div>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="-top-30 relative"
      >
        <PieChart width={500} height={400}>
          <Tooltip content={PieTooltip} />
          <Pie
            data={data?.skillDistribution}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            fill="#d8b484"
            paddingAngle={5}
            dataKey="value"
          >
            {data?.skillDistribution.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 -mt-50 md:ml-25 m-10 text-base text-gray-900">
        {data?.skillDistribution.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center gap-2 w-[45%] m-auto"
          >
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-orange-200/50 rounded-lg p-3 shadow-elevated">
        <p className="text-foreground font-medium">{payload[0].name}</p>
        <p className="text-orange-300">
          <span className="font-semibold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};
