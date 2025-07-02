
import React, { useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';

interface CDIRateBoxProps {
  title: string;
  icon: React.ReactNode;
  rate: number;
  onRateChange: (value: number) => void;
}

const CDIRateBox: React.FC<CDIRateBoxProps> = React.memo(({
  title,
  icon,
  rate,
  onRateChange,
}) => {
  // Memoize change handler to prevent recreation
  const handleCDIChange = useCallback((value: string) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      onRateChange(numericValue);
    }
  }, [onRateChange]);

  // Memoize monthly rate calculations
  const monthlyRates = useMemo(() => {
    const monthlyRateBruto = (Math.pow(1 + rate/100, 1/12) - 1) * 100;
    const monthlyRateLiquido = monthlyRateBruto * 0.85;
    
    return {
      bruto: monthlyRateBruto.toFixed(3).replace('.', ','),
      liquido: monthlyRateLiquido.toFixed(3).replace('.', ',')
    };
  }, [rate]);

  return (
    <div className="calculator-rate-box">
      <div className="icon">
        {icon}
      </div>
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
      <div className="rate flex items-center gap-2">
        <Input
          type="number"
          value={rate}
          onChange={(e) => handleCDIChange(e.target.value)}
          className="w-24 text-lg font-semibold"
          step="0.01"
        />
        <span className="text-lg font-semibold">%</span>
      </div>
      <div className="info-icon">
        <div className="rounded-full bg-white w-5 h-5 flex items-center justify-center text-xs font-bold">i</div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="month-box">
          <div className="value">
            {monthlyRates.bruto}%
          </div>
          <div className="label">Mês Bruto</div>
        </div>
        <div className="month-box">
          <div className="value">
            {monthlyRates.liquido}%
          </div>
          <div className="label">Mês Líquido</div>
        </div>
      </div>
    </div>
  );
});

CDIRateBox.displayName = 'CDIRateBox';

export default CDIRateBox;
