
// Função para aplicar máscara no telefone
export const formatPhoneNumber = (value: string) => {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Se começar com 55, remove para evitar duplicação
  const cleanNumbers = numbers.startsWith('55') ? numbers.slice(2) : numbers;
  
  // Aplica a máscara progressivamente
  if (cleanNumbers.length === 0) return '+55 ';
  if (cleanNumbers.length <= 2) return `+55 (${cleanNumbers}`;
  if (cleanNumbers.length <= 7) return `+55 (${cleanNumbers.slice(0, 2)}) ${cleanNumbers.slice(2)}`;
  return `+55 (${cleanNumbers.slice(0, 2)}) ${cleanNumbers.slice(2, 7)}-${cleanNumbers.slice(7, 11)}`;
};
