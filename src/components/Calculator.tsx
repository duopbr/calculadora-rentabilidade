import React, { Suspense } from 'react';
import CalculatorContainer from './calculator/CalculatorContainer';
import { Skeleton } from './ui/skeleton';

// Lazy loading dos componentes de gráfico para melhor performance
const ResultChart = React.lazy(() => import('./ResultChart'));
const LongTermChart = React.lazy(() => import('./LongTermChart'));

const Calculator = () => {
  return (
    <div className="w-full">
      <CalculatorContainer />
    </div>
  );
};

export default Calculator;
