import React from 'react';
import Calculator from '@/components/Calculator';
import { Check, DollarSign, SlidersHorizontal, BarChart2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/81cabb12-e425-469b-be89-7110bca0ebfb.webp" 
            alt="Duop Logo" 
            className="h-12 w-auto"
            width="192"
            height="48"
            fetchPriority="high"
          />
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-calculator-blue-dark mb-5 text-center">Como usar esta calculadora</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-500 font-semibold mb-3">
                  <Check size={20} />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-calculator-blue-dark mb-2">Escolha o ativo</h3>
                  <p className="text-gray-600 text-sm">Selecione o tipo de investimento para calcular a rentabilidade.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-500 font-semibold mb-3">
                  <DollarSign size={20} />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-calculator-blue-dark mb-2">Defina o valor</h3>
                  <p className="text-gray-600 text-sm">Informe o valor do seu patrimônio para calcular os rendimentos.</p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-500 font-semibold mb-3">
                  <SlidersHorizontal size={20} />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-calculator-blue-dark mb-2">Ajuste as taxas</h3>
                  <p className="text-gray-600 text-sm">Configure as taxas CDI conforme seus cenários de interesse.</p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-blue-500 font-semibold mb-3">
                  <BarChart2 size={20} />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-calculator-blue-dark mb-2">Compare resultados</h3>
                  <p className="text-gray-600 text-sm">Veja a diferença de rendimento entre os cenários e tome a melhor decisão.</p>
                </div>
              </div>
            </div>
          </div>
          
          <Calculator />
        </div>
      </main>
      
      <footer className="mt-16 py-6 border-t border-gray-100 text-center text-gray-500 text-sm">
        <div className="container mx-auto">
          <p>Calculadora de Rentabilidade Express &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
