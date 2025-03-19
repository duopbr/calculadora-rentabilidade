
import React from 'react';
import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <div className="w-10 h-10 bg-calculator-blue rounded-full flex items-center justify-center text-white font-bold">
            D
          </div>
          <h1 className="ml-2 text-xl font-bold text-calculator-gray-dark">Duop</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <Calculator />
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
