
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// ✅ URL única para todas as calculadoras
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEOHIP-UCX_nHRD0_jsTY9YncsWhCENXFl_sxcxmQdRJR6Bq5g0z5LfA66JEyfpybREA/exec';

// Adicionar interface para o dataLayer do Google Tag Manager na window
declare global {
  interface Window {
    dataLayer: any[];
  }
}

const formSchema = z.object({
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
  valorMensal: z.string().min(1, { message: "Valor mensal é obrigatório." }),
});

type LeadCaptureFormValues = z.infer<typeof formSchema>;

interface LeadCaptureFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  source: string; // ✅ Nome da aba da planilha
  onSubmitSuccess: () => void;
}

// Função para aplicar máscara no telefone
const formatPhoneNumber = (value: string) => {
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

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  isOpen,
  onOpenChange,
  source,
  onSubmitSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadCaptureFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+55 ",
      patrimonio: "",
      valorMensal: "",
    },
  });

  const handlePhoneChange = (value: string, onChange: (value: string) => void) => {
    const formatted = formatPhoneNumber(value);
    onChange(formatted);
  };

  async function onSubmit(values: LeadCaptureFormValues) {
    setIsSubmitting(true);
    try {
      // Extrair apenas os números do telefone para salvar no banco
      const phoneNumbers = values.phone.replace(/\D/g, '');
      
      // Inserir dados no Supabase - agora phone é um número
      const { error: supabaseError } = await supabase
        .from('Calculadoras')
        .insert({
          Name: values.name,
          email: values.email,
          phone: parseInt(phoneNumbers), // Convertendo para número
          patrimonio: values.patrimonio,
          valor_mes: values.valorMensal,
          calculadora: { source } // JSON com informações da calculadora
        });

      if (supabaseError) {
        console.error('Erro ao salvar no Supabase:', supabaseError);
        toast({
          title: "Erro",
          description: "Não foi possível salvar seus dados. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      // Continuar enviando para Google Sheets se necessário
      if (GOOGLE_SCRIPT_URL) {
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              phone: values.phone,
              patrimonio: values.patrimonio,
              valorMensal: values.valorMensal,
              source, // ✅ Envia nome da aba
            }),
          });
        } catch (googleError) {
          console.warn('Erro ao enviar para Google Sheets:', googleError);
          // Não bloqueia o fluxo se o Google Sheets falhar
        }
      }

      // Enviar dados para o dataLayer do GTM
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'lead_capture_success',
          user_data: {
            em: values.email,
            ph: values.phone,
          }
        });
        
        // Log para debug (remover em produção se necessário)
        console.log('Dados enviados para o dataLayer:', {
          event: 'lead_capture_success',
          user_data: {
            em: values.email,
            ph: values.phone,
          }
        });
      }

      toast({
        title: "Obrigado!",
        description: "Seus dados foram enviados com sucesso.",
      });
      onSubmitSuccess();
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro geral:', error);
      toast({
        title: "Erro",
        description: `Não foi possível enviar seus dados. (${error instanceof Error ? error.message : String(error)})`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isSubmitting && onOpenChange(open)}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => isSubmitting && e.preventDefault()}
        onEscapeKeyDown={(e) => isSubmitting && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Só mais um passo!</DialogTitle>
          <DialogDescription>
            Para ver o resultado, por favor, deixe suas informações. Prometemos não enviar spam!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+55 (XX) XXXXX-XXXX" 
                      {...field}
                      onChange={(e) => handlePhoneChange(e.target.value, field.onChange)}
                      disabled={isSubmitting}
                      maxLength={19}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patrimonio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patrimônio líquido investido *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="até-50mil">Até R$ 50 mil</SelectItem>
                      <SelectItem value="50mil-150mil">R$ 50 mil - R$ 150 mil</SelectItem>
                      <SelectItem value="150mil-300mil">R$ 150 mil - R$ 300 mil</SelectItem>
                      <SelectItem value="300mil-500mil">R$ 300 mil - R$ 500 mil</SelectItem>
                      <SelectItem value="500mil-1milhao">R$ 500 mil - R$ 1 milhão</SelectItem>
                      <SelectItem value="acima-1milhao">Acima de R$ 1 milhão</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valorMensal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor disponível para investir por mês *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="até-300">Até R$ 300</SelectItem>
                      <SelectItem value="300-500">R$ 300 - R$ 500</SelectItem>
                      <SelectItem value="500-1000">R$ 500 - R$ 1.000</SelectItem>
                      <SelectItem value="1000-3000">R$ 1.000 - R$ 3.000</SelectItem>
                      <SelectItem value="3000-5000">R$ 3.000 - R$ 5.000</SelectItem>
                      <SelectItem value="5000-10000">R$ 5.000 - R$ 10.000</SelectItem>
                      <SelectItem value="acima-10000">Acima de R$ 10.000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Mensagem de proteção de dados */}
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
              🔒 <strong>Seus dados estão protegidos:</strong> Utilizamos criptografia e seguimos a LGPD. 
              Suas informações são usadas apenas para gerar o resultado da calculadora e enviar conteúdos relevantes. 
              Não compartilhamos seus dados com terceiros.
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Ver Resultado e Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
