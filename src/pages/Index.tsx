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
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-calculator-blue-dark mb-2">Calculadora de Rendimento CDI</h1>
            <p className="text-lg text-gray-600">Simule e compare o rendimento de seus investimentos atrelados ao CDI.</p>
          </div>
          
          <Calculator />

          <div className="mt-16 text-gray-800 prose max-w-none">
            <h2 className="text-3xl font-semibold text-calculator-blue-dark mb-4">Entenda Mais Sobre o CDI</h2>
            <p>A taxa CDI (Certificado de Depósito Interbancário) é um dos principais indicadores do mercado financeiro brasileiro. Ela representa a taxa de juros que os bancos cobram para emprestar dinheiro entre si em operações de curtíssimo prazo. Por estar muito próxima da taxa básica de juros, a Selic, o CDI se tornou a principal referência de rentabilidade para a maioria dos investimentos de renda fixa, como CDBs, LCIs, LCAs e fundos de investimento.</p>
            <p>Acompanhar a taxa CDI é fundamental para qualquer investidor. Quando você investe em um produto que paga "100% do CDI", significa que sua rentabilidade será igual à variação dessa taxa no período. Utilizar uma <strong>calculadora de rendimento CDI</strong> como a nossa permite que você visualize o potencial de crescimento do seu dinheiro e compare diferentes cenários, facilitando a tomada de decisões financeiras mais inteligentes e alinhadas aos seus objetivos.</p>

            <h2 className="text-3xl font-semibold text-calculator-blue-dark mt-12 mb-4">Perguntas Frequentes (FAQ)</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-calculator-blue-dark">Como calcular o rendimento do CDI mensal?</h3>
                <p>Para ter uma estimativa do rendimento mensal, você precisa converter a taxa CDI anual para uma taxa mensal. Não basta dividir por 12, pois isso ignora os juros compostos. A forma correta é usar a fórmula de equivalência de taxas. Nossa <strong>calculadora de investimento CDI</strong> já faz esse cálculo complexo para você automaticamente.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-calculator-blue-dark">Qual a diferença entre a taxa CDI e a taxa Selic?</h3>
                <p>A Selic é a taxa básica de juros da economia, definida pelo Banco Central. O CDI é uma taxa privada, praticada entre os bancos. Embora sejam diferentes, seus valores andam sempre muito próximos, com o CDI geralmente ficando um pouco abaixo da Selic. Ambas são referências para a renda fixa.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-calculator-blue-dark">Este simulador de rendimentos considera os impostos?</h3>
                <p>Este simulador calcula a rentabilidade bruta do investimento, ou seja, antes da dedução de impostos como o Imposto de Renda (IR). Para saber o valor líquido, você deve aplicar a alíquota correspondente ao prazo do seu investimento sobre o rendimento obtido.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-calculator-blue-dark">O que significa um investimento que rende 100% do CDI?</h3>
                <p>Significa que a rentabilidade do seu investimento será exatamente igual à variação da taxa CDI no período. Se o CDI rendeu 10% em um ano, seu dinheiro também renderá 10% (bruto). Muitos CDBs de grandes bancos e contas digitais oferecem essa rentabilidade como um padrão seguro e popular no mercado.</p>
              </div>
            </div>
          </div>
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
