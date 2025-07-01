
import React from 'react';

export const PrivacyNotice: React.FC = () => {
  return (
    <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
      🔒 <strong>Seus dados estão protegidos:</strong> Utilizamos criptografia e seguimos a LGPD. 
      Suas informações são usadas apenas para gerar o resultado da calculadora e enviar conteúdos relevantes. 
      Não compartilhamos seus dados com terceiros.
    </div>
  );
};
