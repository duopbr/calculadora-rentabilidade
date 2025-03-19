
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultChartProps {
  currentCDI: number;
  pastCDI: number;
  futureCDI: number;
}

const ResultChart: React.FC<ResultChartProps> = ({ currentCDI, pastCDI, futureCDI }) => {
  const [animationFinished, setAnimationFinished] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationFinished(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const data = [
    {
      name: 'CDI',
      value: currentCDI,
      color: '#F9D56E'
    },
    {
      name: 'CDI ULT',
      value: pastCDI,
      color: '#F8C555'
    },
    {
      name: 'CDI FUT',
      value: futureCDI,
      color: '#8BD49C'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border border-gray-100">
          <p className="text-sm text-gray-600">{payload[0].payload.name}</p>
          <p className="font-semibold text-calculator-gray-dark">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
          barSize={60}
          animationDuration={1000}
          animationBegin={200}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#414B5A', fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={formatCurrency} 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#8A8D96', fontSize: 12 }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
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
};

export default ResultChart;
