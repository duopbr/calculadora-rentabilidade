-- Alterar o nome da coluna Chatgpt para "Interessa na IA" na tabela Calculadoras
ALTER TABLE public."Calculadoras" 
RENAME COLUMN "Chatgpt" TO "Interessa na IA";