import { useResumeContext } from "@/context/ResumeContext";
import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#b946f2", "#acccff", "#fcb995", "#fc80d2"];
export default function SkillDistributionPieChart() {
  const { data } = useResumeContext();
  console.log("Skill Distribution Data:", data?.skillDistribution);
  return (
    <div className="relative w-full h-[500px] bg-[#100120] hover:bg-[#1b1729] transition ease-in-out duration-400 border border-white/10 rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={500} height={400}>
          <Tooltip content={PieTooltip} />
          <Pie
            data={data?.skillDistribution}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            fill="#8884d8"
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
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 -mt-15 md:ml-15 m-10 text-sm text-purple-100">
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
      <div className="bg-neutral-900 border border-purple-200/50 rounded-lg p-3 shadow-elevated">
        <p className="text-foreground font-medium">{payload[0].name}</p>
        <p className="text-purple-300">
          <span className="font-semibold">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};
