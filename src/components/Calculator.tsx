import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon, RefreshCw, TrendingUp } from 'lucide-react';
import CalculatorInput from './CalculatorInput';
import CalculatorResults from './CalculatorResults';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import LeadForm from './LeadForm';

const Calculator = () => {
  const [patrimony, setPatrimony] = useState<string>('');
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);
  const [leadCaptured, setLeadCaptured] = useState<boolean>(false);

  // Taxas CDI (em %)
  const currentCDIRate = 13.15;
  const pastCDIRate = 10.93;
  const futureCDIRate = 14.86;

  // Reset calculator
  const handleClear = () => {
    setPatrimony('');
    setHasCalculated(false);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-8">
            <div className="calculator-rate-box">
              <div className="icon">
                <CalculatorIcon size={20} />
              </div>
              <div className="rate">
                {currentCDIRate.toFixed(2).replace('.', ',')}%
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
              <div className="rate">
                {pastCDIRate.toFixed(2).replace('.', ',')}%
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
              <div className="rate">
                {futureCDIRate.toFixed(2).replace('.', ',')}%
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

        <div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-center text-calculator-gray-dark mb-4">
              Resultados
            </h3>

            {hasCalculated ? (
              <CalculatorResults 
                patrimony={patrimonyAsNumber}
                currentCDI={currentCDIResult}
                pastCDI={pastCDIResult}
                futureCDI={futureCDIResult}
              />
            ) : (
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-400 text-center">
                  Insira um valor e clique em Calcular<br />
                  para ver os resultados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={showLeadForm} onOpenChange={setShowLeadForm}>
        <DialogContent className="sm:max-w-md">
          <LeadForm onSuccess={handleLeadFormSuccess} />
          <DialogClose className="hidden" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calculator;
