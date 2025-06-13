
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  phone: z.string().optional(),
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
      phone: "",
      patrimonio: "",
      valorMensal: "",
    },
  });

  async function onSubmit(values: LeadCaptureFormValues) {
    if (!GOOGLE_SCRIPT_URL) {
      toast({
        title: "Erro de Configuração",
        description: "URL do Google Apps Script não foi definida.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
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
          phone: values.phone || "",
          patrimonio: values.patrimonio,
          valorMensal: values.valorMensal,
          source, // ✅ Envia nome da aba
        }),
      });

      // Enviar dados para o dataLayer do GTM
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'lead_capture_success',
          user_data: {
            em: values.email,
            ph: values.phone || "",
          }
        });
        
        // Log para debug (remover em produção se necessário)
        console.log('Dados enviados para o dataLayer:', {
          event: 'lead_capture_success',
          user_data: {
            em: values.email,
            ph: values.phone || "",
          }
        });
      }

      toast({
        title: "Obrigado!",
        description: "Seus dados foram enviados.",
      });
      onSubmitSuccess();
      form.reset();
      onOpenChange(false);
    } catch (error) {
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
                  <FormLabel>Celular (opcional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(00) 00000-0000" {...field} disabled={isSubmitting} />
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
