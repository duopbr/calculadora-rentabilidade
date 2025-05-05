
/**
 * Calculate monthly income based on CDI rate using compound interest
 */
export const calculateMonthlyIncome = (principal: number, annualRate: number) => {
  // Convert annual rate to monthly using compound interest formula (^1/12)
  const monthlyRate = Math.pow((1 + annualRate / 100), 1/12) - 1;
  const grossMonthly = principal * monthlyRate;
  
  // Calculate net income (after 15% income tax on financial investments)
  const netMonthly = grossMonthly * 0.85;
  
  return {
    rate: annualRate,
    grossMonthly,
    netMonthly
  };
};
