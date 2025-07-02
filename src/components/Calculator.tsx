import React, { memo } from 'react';
import CalculatorContainer from './calculator/CalculatorContainer';

const Calculator = memo(() => {
  return <CalculatorContainer />;
});

Calculator.displayName = 'Calculator';

export default Calculator;
