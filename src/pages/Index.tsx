
import React from 'react';
import Calculator from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <div className="w-10 h-10 bg-[#1CA2FC] rounded-full flex items-center justify-center text-white font-bold">
            <img 
              src="/lovable-uploads/81cabb12-e425-469b-be89-7110bca0ebfb.png" 
              alt="Duop Logo" 
              className="w-8 h-8"
            />
          </div>
          <h1 className="ml-2 text-xl font-bold text-calculator-gray-dark">Duop</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
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

