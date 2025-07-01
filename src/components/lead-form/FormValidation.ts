
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string()
    .min(1, { message: "Telefone é obrigatório." })
    .regex(/^\+55 \(\d{2}\) \d{5}-\d{4}$/, { message: "Formato inválido. Use: +55 (XX) XXXXX-XXXX" })
    .refine((phone) => {
      const digits = phone.replace(/\D/g, '');
      return digits.length === 13; // +55 + 11 dígitos
    }, { message: "Telefone deve ter 11 dígitos." }),
  patrimonio: z.string().min(1, { message: "Patrimônio investido é obrigatório." }),
  chatgpt: z.string().min(1, { message: "Por favor, selecione uma opção." }),
});

export type LeadCaptureFormValues = z.infer<typeof formSchema>;
