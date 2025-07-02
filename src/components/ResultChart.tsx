
import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

// Definição de tipos para os dados do gráfico
interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

// Definição de tipos para as propriedades do componente
interface ResultChartProps {
  data: ChartDataItem[];
}

// Memoize formatters to prevent recreation
const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

// Memoized tooltip component
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-semibold">{label}</p>
        <p className="text-calculator-blue font-bold">
          {formatCurrency(payload[0].value)}
        </p>
        <p className="text-xs text-gray-500">Renda mensal</p>
      </div>
    );
  }

  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

const ResultChart: React.FC<ResultChartProps> = React.memo(({ data }) => {
  // Memoize dynamic Y-axis maximum calculation
  const yAxisMax = useMemo(() => {
    const maxValue = Math.max(...data.map(item => item.value));
    return maxValue * 1.15; // 15% higher than the tallest bar
  }, [data]);

  return (
    <div className="w-full h-[300px] mt-4 animate-fade-up">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            domain={[0, yAxisMax]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="value" 
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

ResultChart.displayName = 'ResultChart';

export default ResultChart;
