
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
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(2).replace('.', ',') + '%';
  };

  return (
    <div className="mt-8 animate-fade-up">
      <div className="calculator-result-box mb-6">
        <div className="text-left">
          <p className="label">Quanto Você ganhará por mês</p>
          <p className="label">(CDI Futuro - 12 meses)</p>
        </div>
        <div className="text-right">
          <p className="value">{formatCurrency(futureCDI.netMonthly)}</p>
        </div>
      </div>

      <ResultChart 
        currentCDI={currentCDI.netMonthly} 
        pastCDI={pastCDI.netMonthly} 
        futureCDI={futureCDI.netMonthly} 
      />

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
