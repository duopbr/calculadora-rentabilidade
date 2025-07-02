
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface CalculatorActionsProps {
  onCalculate: () => void;
  onClear: () => void;
  isLoading: boolean;
}

const CalculatorActions: React.FC<CalculatorActionsProps> = React.memo(({
  onCalculate,
  onClear,
  isLoading,
}) => {
  return (
    <div className="flex space-x-4">
      <button 
        onClick={onClear}
        className="calculator-button secondary flex-1"
        type="button"
      >
        Limpar
      </button>
      <button 
        onClick={onCalculate}
        className="calculator-button primary flex-1"
        disabled={isLoading}
        type="button"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <RefreshCw size={18} className="mr-2 animate-spin" />
            Calculando...
          </span>
        ) : 'Calcular'}
      </button>
    </div>
  );
});

CalculatorActions.displayName = 'CalculatorActions';

export default CalculatorActions;
