
import React from 'react';
import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/81cabb12-e425-469b-be89-7110bca0ebfb.png" 
            alt="Duop Logo" 
            className="h-12"
          />
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-calculator-blue-dark mb-3">Como funciona a Calculadora de Rentabilidade?</h2>
            <p className="text-gray-700 mb-3">
              Esta calculadora permite estimar a rentabilidade mensal do seu patrimônio com base em diferentes taxas CDI:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">CDI Atual:</span> Usa a taxa CDI vigente para calcular seus rendimentos.</li>
              <li><span className="font-medium">CDI Últimos 12 Meses:</span> Calcula com base na média do CDI do último ano.</li>
              <li><span className="font-medium">CDI Futuro 12 Meses:</span> Projeção de rendimentos para o próximo ano.</li>
            </ul>
            <p className="mt-3 text-gray-700">
              Digite o valor do seu patrimônio e clique em "Calcular" para ver quanto você pode ganhar mensalmente em cada cenário.
            </p>
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
