
import React from 'react';
import ResultChart from './ResultChart';

interface CalculatorResultsProps {
  patrimony: number;
  currentCDI: {
    rate: number;
    grossMonthly: number;
    netMonthly: number;
  };
  pastCDI: {
    rate: number;
    grossMonthly: number;
    netMonthly: number;
  };
  futureCDI: {
    rate: number;
    grossMonthly: number;
    netMonthly: number;
  };
}

const CalculatorResults: React.FC<CalculatorResultsProps> = ({
  patrimony,
  currentCDI,
  pastCDI,
  futureCDI
}) => {
  const formatCurrency = (value: number) => {
    // Round to 2 decimal places before formatting
    const roundedValue = Math.round(value * 100) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(roundedValue);
  };

  const formatPercentage = (value: number) => {
    // Round to 2 decimal places
    const roundedValue = Math.round(value * 100) / 100;
    return roundedValue.toFixed(2).replace('.', ',') + '%';
  };

  // Prepare data for the chart with rounded values
  const chartData = [
    { 
      name: 'CDI Atual', 
      value: Math.round(currentCDI.netMonthly * 100) / 100, 
      color: '#4f46e5' 
    },
    { 
      name: 'Quanto rendeu o CDI nos ultimos 12 meses', 
      value: Math.round(pastCDI.netMonthly * 100) / 100, 
      color: '#60a5fa' 
    },
    { 
      name: 'Quanto o CDI deve render nos proximos 12 meses', 
      value: Math.round(futureCDI.netMonthly * 100) / 100, 
      color: '#10b981' 
    }
  ];

  return (
    <div className="mt-8 animate-fade-up">
      <div className="calculator-result-box mb-6">
        <div className="text-left">
          <p className="label">Quanto Você ganhará por mês</p>
          <p className="label">(líquido de IR - CDI Futuro 12 meses)</p>
        </div>
        <div className="text-right">
          <p className="value">{formatCurrency(futureCDI.netMonthly)}</p>
        </div>
      </div>

      <ResultChart data={chartData} />

      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 bg-calculator-gray rounded-md animate-scale-in" style={{animationDelay: '0.1s'}}>
          <p className="text-sm text-gray-600 mb-1">CDI Atual</p>
          <p className="font-semibold text-calculator-gray-dark">{formatPercentage(currentCDI.rate)}</p>
        </div>
        <div className="text-center p-4 bg-calculator-gray rounded-md animate-scale-in" style={{animationDelay: '0.2s'}}>
          <p className="text-sm text-gray-600 mb-1">CDI Últimos 12m</p>
          <p className="font-semibold text-calculator-gray-dark">{formatPercentage(pastCDI.rate)}</p>
        </div>
        <div className="text-center p-4 bg-calculator-gray rounded-md animate-scale-in" style={{animationDelay: '0.3s'}}>
          <p className="text-sm text-gray-600 mb-1">CDI Futuro 12m</p>
          <p className="font-semibold text-calculator-gray-dark">{formatPercentage(futureCDI.rate)}</p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResults;
