
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SentimentPieChartProps {
  positive: number;
  neutral: number;
  negative: number;
  keyPhrases: string[];
}

const COLORS = ["#34D399", "#F59E0B", "#EF4444"]; // green, amber, red

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-md text-xs">
        <p className="font-medium">{payload[0].name}: {payload[0].value}%</p>
        <p className="text-muted-foreground mt-1">{payload[0].payload.phrases.join(", ")}</p>
      </div>
    );
  }
  return null;
};

export const SentimentPieChart = ({ 
  positive, 
  neutral, 
  negative,
  keyPhrases
}: SentimentPieChartProps) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = [
    { 
      name: "Positive", 
      value: Math.round(positive * 100), 
      color: COLORS[0],
      phrases: keyPhrases.filter((_, i) => i % 3 === 0) // Mock distribution of phrases
    },
    { 
      name: "Neutral", 
      value: Math.round(neutral * 100), 
      color: COLORS[1],
      phrases: keyPhrases.filter((_, i) => i % 3 === 1)
    },
    { 
      name: "Negative", 
      value: Math.round(negative * 100), 
      color: COLORS[2],
      phrases: keyPhrases.filter((_, i) => i % 3 === 2)
    }
  ];

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <path
          d={props.arc}
          fill={fill}
          stroke="#fff"
          strokeWidth={hoverIndex === props.index ? 2 : 0}
          style={{
            filter: hoverIndex === props.index ? "drop-shadow(0 0 4px rgba(0,0,0,0.3))" : "none",
            transform: hoverIndex === props.index ? "scale(1.05)" : "scale(1)",
            transformOrigin: `${cx}px ${cy}px`,
            transition: "all 0.2s ease-in-out"
          }}
        />
      </g>
    );
  };

  return (
    <div className="w-full aspect-square max-w-[180px] mx-auto">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={45}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ 
                        filter: hoverIndex === index ? "brightness(1.1)" : "none",
                        transition: "all 0.3s ease"
                      }} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold">{Math.round((positive) * 100)}%</div>
                <div className="text-xs text-muted-foreground">Positive</div>
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">
          <div className="text-sm font-medium">Review Sentiment</div>
          <p className="text-sm text-muted-foreground">Hover over chart segments to see key phrases from reviews</p>
          <div className="mt-2 space-y-1">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
