
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface CalculatorInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = '0,00'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Format input as currency (Brazilian Real)
  const formatCurrency = (value: string): string => {
    // Remove any non-digit character
    let numericValue = value.replace(/\D/g, '');
    
    // Convert to a number and format
    if (numericValue) {
      // Convert to cents (divide by 100)
      const number = parseInt(numericValue, 10) / 100;
      return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove R$ and any formatting before passing to parent
    const cleanValue = rawValue.replace(/\D/g, '');
    onChange(cleanValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Select all text when focusing
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.select();
      }, 0);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="calculator-input animate-fade-up">
      <input
        ref={inputRef}
        type="text"
        value={value ? formatCurrency(value) : ''}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${isFocused || value ? 'border-calculator-blue' : ''}`}
      />
      {value && (
        <button 
          onClick={onClear} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default CalculatorInput;
