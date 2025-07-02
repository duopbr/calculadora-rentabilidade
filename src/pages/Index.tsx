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
            decoding="async"
          />
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading - H1 */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-calculator-blue-dark mb-4">
              Calculadora de Rendimentos Mensais (CDI): Simule sua Renda
            </h1>
          </div>

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
          
          {/* Calculator Component - Unchanged */}
          <Calculator />

<<<<<<< Updated upstream
          {/* Educational Content Section - NEW CONTENT BELOW CALCULATOR */}
          <section className="mt-16 max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-calculator-blue-dark mb-6">
                Entendendo os Juros Compostos: A Bola de Neve do seu Dinheiro
              </h2>
              
              <div className="text-gray-700 leading-relaxed space-y-4 mb-8">
                <p>
                  Você já se perguntou por que os resultados da calculadora são tão impressionantes a longo prazo? 
                  A resposta está nos juros compostos, muitas vezes chamados de "a oitava maravilha do mundo".
                </p>
                
                <p>
                  Diferente dos juros simples, que rendem sempre sobre o valor inicial, os juros compostos são 
                  "juros sobre juros". Funciona assim:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Seu dinheiro rende juros no primeiro mês.</li>
                  <li>No segundo mês, os juros renderão não apenas sobre o valor inicial, mas também sobre os juros que você já ganhou.</li>
                  <li>Esse ciclo se repete, criando um efeito "bola de neve": seu patrimônio cresce de forma exponencial ao longo do tempo.</li>
                </ul>
                
                <p>
                  É por isso que começar a investir o quanto antes, mesmo com pouco dinheiro, faz uma diferença 
                  gigantesca no seu futuro financeiro.
                </p>
              </div>

              {/* FAQ Section */}
              <h2 className="text-2xl font-semibold text-calculator-blue-dark mb-6">
                Perguntas Frequentes sobre Investimentos e Rendimentos
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-calculator-blue pl-6">
                  <h3 className="text-xl font-medium text-calculator-blue-dark mb-3">
                    Qual a diferença entre juros simples e juros compostos?
                  </h3>
                  <p className="text-gray-700">
                    Os juros simples incidem sempre sobre o valor inicial investido. Já os juros compostos incidem 
                    sobre o montante total (valor inicial + juros acumulados), permitindo um crescimento muito mais 
                    rápido do seu dinheiro. Nossa calculadora utiliza a fórmula de juros compostos para uma projeção realista.
                  </p>
                </div>

                <div className="border-l-4 border-calculator-blue pl-6">
                  <h3 className="text-xl font-medium text-calculator-blue-dark mb-3">
                    Esta calculadora serve para qualquer tipo de investimento?
                  </h3>
                  <p className="text-gray-700">
                    Sim! Ela é ideal para simular qualquer investimento com uma rentabilidade previsível, como 
                    Tesouro Direto (Selic, IPCA+), CDBs, LCIs, LCAs e fundos de investimento. Para renda variável 
                    (ações, fundos imobiliários), a taxa de juros pode ser usada como uma estimativa de rentabilidade 
                    média que você espera alcançar.
                  </p>
                </div>

                <div className="border-l-4 border-calculator-blue pl-6">
                  <h3 className="text-xl font-medium text-calculator-blue-dark mb-3">
                    Quanto preciso para começar a investir?
                  </h3>
                  <p className="text-gray-700">
                    Hoje, é possível começar a investir com valores muito baixos, como R$ 30 ou até menos. 
                    O mais importante não é a quantidade inicial, mas sim a disciplina de fazer aportes mensais 
                    e deixar o tempo agir. Use a calculadora para ver como até mesmo pequenos valores se transformam 
                    em uma grande fortuna.
                  </p>
                </div>

                <div className="border-l-4 border-calculator-blue pl-6">
                  <h3 className="text-xl font-medium text-calculator-blue-dark mb-3">
                    O resultado da simulação é garantido?
                  </h3>
                  <p className="text-gray-700">
                    Não. A calculadora é uma ferramenta de projeção baseada nos dados que você insere. 
                    A rentabilidade de investimentos, especialmente os de renda variável, pode oscilar. 
                    Para a renda fixa, a projeção tende a ser mais precisa, mas ainda assim é uma estimativa.
                  </p>
                </div>
              </div>
            </article>
=======
          {/* Seção de Conteúdo Educativo */}
          <section className="mt-16 mb-12">
            <h2 className="text-2xl font-bold text-calculator-blue-dark mb-6">Entenda Mais Sobre o CDI</h2>
            
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                O CDI (Certificado de Depósito Interbancário) é uma taxa de referência fundamental no mercado financeiro brasileiro. 
                Ela representa a taxa média dos empréstimos realizados entre bancos e serve como base para calcular o rendimento 
                de diversos investimentos de renda fixa, como CDBs, LCIs, LCAs e fundos DI.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                A taxa CDI acompanha de perto a taxa Selic (taxa básica de juros) e é atualizada diariamente. 
                Quando você investe em produtos que rendem um percentual do CDI, como "100% do CDI" ou "110% do CDI", 
                você está aplicando sobre esta taxa de referência. Quanto maior o percentual oferecido sobre o CDI, 
                maior será o seu rendimento.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Acompanhar a taxa CDI é essencial para tomar decisões inteligentes sobre seus investimentos. 
                Nossa calculadora permite simular diferentes cenários de taxa CDI, ajudando você a projetar 
                seus rendimentos futuros e comparar diferentes oportunidades de investimento de forma prática e precisa.
              </p>
            </div>
          </section>

          {/* Seção de FAQ */}
          <section className="mt-12 mb-16">
            <h2 className="text-2xl font-bold text-calculator-blue-dark mb-8">Perguntas Frequentes (FAQ)</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-calculator-blue-dark mb-3">Como calcular o rendimento do CDI mensal?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Para calcular o rendimento mensal do CDI, divida a taxa anual por 12 meses e aplique sobre o valor investido. 
                  Nossa calculadora faz esse cálculo automaticamente, considerando a capitalização composta e mostrando 
                  exatamente quanto você receberá mensalmente com base no valor investido e na taxa CDI atual.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-calculator-blue-dark mb-3">Qual a diferença entre a taxa CDI e a taxa Selic?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A taxa Selic é a taxa básica de juros da economia, definida pelo Banco Central, enquanto o CDI é a taxa média 
                  de empréstimos entre bancos. Na prática, o CDI costuma ficar muito próximo da Selic (geralmente alguns 
                  pontos decimais abaixo), mas é o CDI que serve como referência para a maioria dos investimentos de renda fixa.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-calculator-blue-dark mb-3">Este simulador de rendimentos considera os impostos?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sim, nossa calculadora de CDI já considera o Imposto de Renda nos cálculos líquidos apresentados. 
                  Os valores mostrados como "Mês Líquido" já estão com a dedução do IR aplicada conforme a tabela regressiva, 
                  que varia de 22,5% a 15% dependendo do prazo de aplicação do investimento.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-calculator-blue-dark mb-3">O que significa um investimento que rende 100% do CDI?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Quando um investimento oferece "100% do CDI", significa que você receberá exatamente a taxa CDI como rendimento. 
                  Já investimentos que oferecem "110% do CDI" ou "120% do CDI" pagam um prêmio acima desta taxa de referência. 
                  É uma forma de comparar diferentes produtos de renda fixa de maneira padronizada.
                </p>
              </div>
            </div>
>>>>>>> Stashed changes
          </section>
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
