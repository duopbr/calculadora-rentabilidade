
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Calculator as CalculatorIcon, RefreshCw, TrendingUp } from 'lucide-react';
import CalculatorInput from '../CalculatorInput';
import CalculatorResults from '../CalculatorResults';
import { toast } from '@/components/ui/use-toast';
import { LeadCaptureForm } from '../LeadForm';
import CDIRateBox from './CDIRateBox';
import CalculatorActions from './CalculatorActions';
import { calculateMonthlyIncome } from '@/utils/calculatorUtils';
import { Input } from '@/components/ui/input';

// Lazy load heavy components
const LongTermChart = React.lazy(() => import('../LongTermChart'));

const CalculatorContainer = React.memo(() => {
  const [patrimony, setPatrimony] = useState<string>('');
  const [years, setYears] = useState<string>('10');
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showLeadForm, setShowLeadForm] = useState<boolean>(true);
  const [leadCaptured, setLeadCaptured] = useState<boolean>(false);

  // CDI Rates with updated default values
  const [currentCDIRate, setCurrentCDIRate] = useState<number>(14.9);
  const [pastCDIRate, setPastCDIRate] = useState<number>(12.1);
  const [futureCDIRate, setFutureCDIRate] = useState<number>(14.60);

  // Memoized calculations to prevent unnecessary recalculations
  const calculations = useMemo(() => {
    const patrimonyAsNumber = parseInt(patrimony) / 100 || 0;
    const yearsAsNumber = parseInt(years) || 10;

    return {
      patrimonyAsNumber,
      yearsAsNumber,
      currentCDIResult: calculateMonthlyIncome(patrimonyAsNumber, currentCDIRate),
      pastCDIResult: calculateMonthlyIncome(patrimonyAsNumber, pastCDIRate),
      futureCDIResult: calculateMonthlyIncome(patrimonyAsNumber, futureCDIRate)
    };
  }, [patrimony, years, currentCDIRate, pastCDIRate, futureCDIRate]);

  // Reset calculator - useCallback to prevent recreation
  const handleClear = useCallback(() => {
    setPatrimony('');
    setYears('10');
    setHasCalculated(false);
    // Reset CDI rates to updated default values
    setCurrentCDIRate(14.9);
    setPastCDIRate(12.1);
    setFutureCDIRate(14.60);
  }, []);

  // Calculate results after lead capture - useCallback to prevent recreation
  const calculateResults = useCallback(() => {
    setIsLoading(true);
    
    // Simulando um breve carregamento para mostrar a animação
    setTimeout(() => {
      setHasCalculated(true);
      setIsLoading(false);
    }, 600);
  }, []);

  // Handle lead form success - now automatically calculates
  const handleLeadFormSuccess = useCallback(() => {
    setShowLeadForm(false);
    setLeadCaptured(true);
    // Automatically calculate results after lead capture
    calculateResults();
  }, [calculateResults]);

  // Calculate button handler - show lead form if not captured
  const handleCalculate = useCallback(() => {
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
  }, [patrimony, leadCaptured, calculateResults]);

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
        <CDIRateBox
          title="CDI Atual"
          icon={<CalculatorIcon size={20} />}
          rate={currentCDIRate}
          onRateChange={setCurrentCDIRate}
        />

        <CDIRateBox
          title="Média do CDI Últimos 12 Meses"
          icon={<RefreshCw size={20} />}
          rate={pastCDIRate}
          onRateChange={setPastCDIRate}
        />

        <CDIRateBox
          title="CDI Futuro 12 Meses"
          icon={<TrendingUp size={20} />}
          rate={futureCDIRate}
          onRateChange={setFutureCDIRate}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-end">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do patrimônio
            </label>
            <CalculatorInput 
              value={patrimony} 
              onChange={setPatrimony} 
              onClear={handleClear}
              placeholder="Digite o valor do seu patrimônio" 
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período (em anos)
            </label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="10"
              min="1"
              max="50"
              className="h-12 text-lg"
            />
          </div>
        </div>

        <CalculatorActions
          onCalculate={handleCalculate}
          onClear={handleClear}
          isLoading={isLoading}
        />
      </div>

      {hasCalculated && (
        <div className="mt-8">
          <CalculatorResults 
            patrimony={calculations.patrimonyAsNumber}
            currentCDI={calculations.currentCDIResult}
            pastCDI={calculations.pastCDIResult}
            futureCDI={calculations.futureCDIResult}
          />
          
          {/* Long-term projection section with Suspense for lazy loading */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-calculator-blue-dark mb-6">
              Projeção de Crescimento do Patrimônio
            </h3>
            <React.Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-md"></div>}>
              <LongTermChart 
                initialValue={calculations.patrimonyAsNumber}
                annualRate={futureCDIRate}
                years={calculations.yearsAsNumber}
              />
            </React.Suspense>
          </div>
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
});

CalculatorContainer.displayName = 'CalculatorContainer';

export default CalculatorContainer;
