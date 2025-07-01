
-- Adicionar as novas colunas na tabela Calculadoras (com nome correto)
ALTER TABLE public."Calculadoras" 
ADD COLUMN "Interesse em dados" text,
ADD COLUMN "Chatgpt" text,
ADD COLUMN "Se sentiu enganado" text;
