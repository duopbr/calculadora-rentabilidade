import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, RefreshCw, TrendingUp } from 'lucide-react';
import CalculatorInput from './CalculatorInput';
import CalculatorResults from './CalculatorResults';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { LeadCaptureForm } from './LeadForm';
import { Input } from '@/components/ui/input';

const Calculator = () => {
  const [patrimony, setPatrimony] = useState<string>('');
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);
  const [leadCaptured, setLeadCaptured] = useState<boolean>(false);

  // CDI Rates with default values
  const [currentCDIRate, setCurrentCDIRate] = useState<number>(14.15);
  const [pastCDIRate, setPastCDIRate] = useState<number>(10.93);
  const [futureCDIRate, setFutureCDIRate] = useState<number>(14.86);

  // Handle CDI rate changes
  const handleCDIChange = (value: string, setter: (value: number) => void) => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      setter(numericValue);
    }
  };

  // Reset calculator
  const handleClear = () => {
    setPatrimony('');
    setHasCalculated(false);
    // Reset CDI rates to default values
    setCurrentCDIRate(14.15);
    setPastCDIRate(10.93);
    setFutureCDIRate(14.86);
  };

  // Handle lead form success
  const handleLeadFormSuccess = () => {
    setShowLeadForm(false);
    setLeadCaptured(true);
    
    // Calculate after lead is captured
    calculateResults();
  };

  // Calculate results after lead capture
  const calculateResults = () => {
    setIsLoading(true);
    
    // Simulando um breve carregamento para mostrar a animação
    setTimeout(() => {
      setHasCalculated(true);
      setIsLoading(false);
    }, 600);
  };

  // Calculate button handler - show lead form if not captured
  const handleCalculate = () => {
    if (!patrimony || parseInt(patrimony) === 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor de patrimônio válido.",
        variant: "destructive"
      });
      return;
    }

    if (leadCaptured) {
      // Already captured lead, calculate directly
      calculateResults();
    } else {
      // Show lead form
      setShowLeadForm(true);
    }
  };

  // Calculate monthly income based on CDI rate
  const calculateMonthlyIncome = (principal: number, annualRate: number) => {
    // Convert annual rate to monthly and calculate gross income
    const monthlyRate = annualRate / 100 / 12;
    const grossMonthly = principal * monthlyRate;
    
    // Calculate net income (after 15% income tax on financial investments)
    const netMonthly = grossMonthly * 0.85;
    
    return {
      rate: annualRate,
      grossMonthly,
      netMonthly
    };
  };

  // Convert string to number
  const patrimonyAsNumber = parseInt(patrimony) / 100 || 0;

  // Calculate results for all three CDI rates
  const currentCDIResult = calculateMonthlyIncome(patrimonyAsNumber, currentCDIRate);
  const pastCDIResult = calculateMonthlyIncome(patrimonyAsNumber, pastCDIRate);
  const futureCDIResult = calculateMonthlyIncome(patrimonyAsNumber, futureCDIRate);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-calculator-gray-dark">
          Calculadora
        </h1>
        <h2 className="text-xl text-calculator-blue font-medium">
          Rentabilidade Mensal
        </h2>
      </header>

      <div className="space-y-6">
        <div className="calculator-rate-box">
          <div className="icon">
            <CalculatorIcon size={20} />
          </div>
          <h3 className="text-sm text-gray-600 mb-2">CDI Atual</h3>
          <div className="rate flex items-center gap-2">
            <Input
              type="number"
              value={currentCDIRate}
              onChange={(e) => handleCDIChange(e.target.value, setCurrentCDIRate)}
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
                {(currentCDIRate / 12).toFixed(2).replace('.', ',')}%
              </div>
              <div className="label">Mês Bruto</div>
            </div>
            <div className="month-box">
              <div className="value">
                {((currentCDIRate / 12) * 0.85).toFixed(2).replace('.', ',')}%
              </div>
              <div className="label">Mês Líquido</div>
            </div>
          </div>
        </div>

        <div className="calculator-rate-box">
          <div className="icon">
            <RefreshCw size={20} />
          </div>
          <h3 className="text-sm text-gray-600 mb-2">Média do CDI Últimos 12 Meses</h3>
          <div className="rate flex items-center gap-2">
            <Input
              type="number"
              value={pastCDIRate}
              onChange={(e) => handleCDIChange(e.target.value, setPastCDIRate)}
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
                {(pastCDIRate / 12).toFixed(2).replace('.', ',')}%
              </div>
              <div className="label">Mês Bruto</div>
            </div>
            <div className="month-box">
              <div className="value">
                {((pastCDIRate / 12) * 0.85).toFixed(2).replace('.', ',')}%
              </div>
              <div className="label">Mês Líquido</div>
            </div>
          </div>
        </div>

        <div className="calculator-rate-box">
          <div className="icon">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-sm text-gray-600 mb-2">CDI Futuro 12 Meses</h3>
          <div className="rate flex items-center gap-2">
            <Input
              type="number"
              value={futureCDIRate}
              onChange={(e) => handleCDIChange(e.target.value, setFutureCDIRate)}
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
                {(futureCDIRate / 12).toFixed(2).replace('.', ',')}%
              </div>
              <div className="label">Mês Bruto</div>
            </div>
            <div className="month-box">
              <div className="value">
                {((futureCDIRate / 12) * 0.85).toFixed(2).replace('.', ',')}%
              </div>
              <div className="label">Mês Líquido</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <CalculatorInput 
            value={patrimony} 
            onChange={setPatrimony} 
            onClear={handleClear}
            placeholder="Digite o valor do seu patrimônio" 
          />
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={handleClear}
            className="calculator-button secondary flex-1"
          >
            Limpar
          </button>
          <button 
            onClick={handleCalculate}
            className="calculator-button primary flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <RefreshCw size={18} className="mr-2 animate-spin" />
                Calculando...
              </span>
            ) : 'Calcular'}
          </button>
        </div>
      </div>

      {hasCalculated && (
        <div className="mt-8">
          <CalculatorResults 
            patrimony={patrimonyAsNumber}
            currentCDI={currentCDIResult}
            pastCDI={pastCDIResult}
            futureCDI={futureCDIResult}
          />
        </div>
      )}

      <LeadCaptureForm 
        isOpen={showLeadForm}
        onOpenChange={setShowLeadForm}
        onSubmitSuccess={handleLeadFormSuccess}
        source="CalculadoraRentabilidade"
      />

    </div>
  );
};

export default Calculator;
