
import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface LongTermChartProps {
  initialValue: number;
  annualRate: number;
  years: number;
}

// Memoized formatter
const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Memoized tooltip component
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-semibold">Ano {label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.name}: {formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

const LongTermChart: React.FC<LongTermChartProps> = React.memo(({ initialValue, annualRate, years }) => {
  // Memoize chart data generation
  const chartData = useMemo(() => {
    const data = [];
    
    for (let year = 0; year <= years; year++) {
      // Compound interest formula: A = P(1 + r)^t
      const compoundValue = initialValue * Math.pow(1 + (annualRate / 100), year);
      
      data.push({
        year,
        valorInvestido: initialValue,
        valorTotal: Math.round(compoundValue)
      });
    }
    
    return data;
  }, [initialValue, annualRate, years]);

  // Memoize summary calculations
  const summaryData = useMemo(() => {
    const finalValue = chartData[chartData.length - 1]?.valorTotal || 0;
    const totalInterest = finalValue - initialValue;
    
    return {
      finalValue,
      totalInterest
    };
  }, [chartData, initialValue]);

  return (
    <div className="mt-8 animate-fade-up">
      {/* Summary Boxes - Made responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="text-center p-3 bg-calculator-gray rounded-md min-h-[80px] flex flex-col justify-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 leading-tight">Valor total final</p>
          <p className="font-bold text-sm sm:text-lg md:text-xl text-calculator-gray-dark break-all hyphens-auto overflow-hidden">{formatCurrency(summaryData.finalValue)}</p>
        </div>
        <div className="text-center p-3 bg-calculator-gray rounded-md min-h-[80px] flex flex-col justify-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 leading-tight">Valor total investido</p>
          <p className="font-bold text-sm sm:text-lg md:text-xl text-calculator-gray-dark break-all hyphens-auto overflow-hidden">{formatCurrency(initialValue)}</p>
        </div>
        <div className="text-center p-3 bg-calculator-gray rounded-md min-h-[80px] flex flex-col justify-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-1 leading-tight">Total em juros</p>
          <p className="font-bold text-sm sm:text-lg md:text-xl text-green-600 break-all hyphens-auto overflow-hidden">{formatCurrency(summaryData.totalInterest)}</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: 'Anos', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line 
              type="monotone" 
              dataKey="valorInvestido" 
              stroke="#4b5563" 
              strokeWidth={3}
              name="Valor Investido"
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="valorTotal" 
              stroke="#dc2626" 
              strokeWidth={3}
              name="Valor Total Final"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

LongTermChart.displayName = 'LongTermChart';

export default LongTermChart;
