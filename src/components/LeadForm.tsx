import React, { useState, memo } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

import { formSchema, LeadCaptureFormValues } from './lead-form/FormValidation';
import { FormFields } from './lead-form/FormFields';
import { submitFormData } from './lead-form/DataSubmission';
import { PrivacyNotice } from './lead-form/PrivacyNotice';

interface LeadCaptureFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  source: string;
<<<<<<< Updated upstream
  onSubmitSuccess: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
=======
  onSubmitSuccess?: () => void;
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

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = memo(({
>>>>>>> Stashed changes
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
      chatgpt: "",
    },
  });

  async function onSubmit(values: LeadCaptureFormValues) {
    setIsSubmitting(true);
    try {
<<<<<<< Updated upstream
      await submitFormData(values, source);
=======
      // Extrair apenas os números do telefone para salvar no banco
      const phoneNumbers = values.phone.replace(/\D/g, '');
      
      console.log('Dados a serem enviados:', {
        Name: values.name, // Usando 'Name' com N maiúsculo conforme schema
        email: values.email,
        phone: phoneNumbers,
        patrimonio: values.patrimonio,
        valor_mes: values.valorMensal,
        calculadora: source
      });
      
      // Inserir dados no Supabase - usando Name com N maiúsculo
      const { error: supabaseError } = await supabase
        .from('Calculadoras')
        .insert({
          Name: values.name, // Usando 'Name' com N maiúsculo conforme schema da tabela
          email: values.email,
          phone: phoneNumbers, // Salvando como string de números
          patrimonio: values.patrimonio,
          valor_mes: values.valorMensal,
          calculadora: source // String simples ao invés de JSON
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

      // Se chegou até aqui, o Supabase deu certo
      console.log('✅ Dados salvos no Supabase com sucesso');

      // Agora enviar para o Google Sheets como backup
      try {
        const googleData = {
          name: values.name,
          email: values.email,
          phone: values.phone, // Enviando com a máscara para o Google Sheets
          patrimonio: values.patrimonio,
          valorMensal: values.valorMensal,
          source: source,
          timestamp: new Date().toISOString()
        };

        console.log('Enviando para Google Sheets:', googleData);

        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Importante para evitar CORS
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(googleData)
        });

        console.log('✅ Dados enviados para Google Sheets');
      } catch (googleError) {
        console.warn('⚠️ Erro ao enviar para Google Sheets (não crítico):', googleError);
        // Não falha a operação se o Google Sheets der erro
      }

      // Enviar evento para Google Tag Manager
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'lead_capture',
          lead_source: source,
          form_name: 'calculadora_rentabilidade'
        });
      }
>>>>>>> Stashed changes

      toast({
        title: "Sucesso!",
        description: "Seus dados foram enviados. Agora você pode ver os resultados da calculadora.",
      });

      // Reset form
      form.reset();
      
      // Call success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

    } catch (error) {
      console.error('Erro geral:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
<<<<<<< Updated upstream
    <Dialog open={isOpen} onOpenChange={(open) => !isSubmitting && onOpenChange(open)}>
      <DialogContent
        className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => isSubmitting && e.preventDefault()}
        onEscapeKeyDown={(e) => isSubmitting && e.preventDefault()}
      >
=======
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
>>>>>>> Stashed changes
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-calculator-blue-dark">
            📊 Acesse os Resultados da Calculadora
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Para visualizar os resultados detalhados e receber análises personalizadas dos seus investimentos, 
            preencha as informações abaixo. É rápido e seus dados estão protegidos.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
<<<<<<< Updated upstream
            <FormFields control={form.control} isSubmitting={isSubmitting} />
            <PrivacyNotice />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Ver Resultado e Salvar"}
=======
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite seu nome completo" 
                      {...field} 
                      disabled={isSubmitting}
                    />
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
                  <FormLabel>E-mail *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="seu.email@exemplo.com" 
                      {...field} 
                      disabled={isSubmitting}
                    />
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
                  <FormLabel>Telefone/WhatsApp *</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+55 (XX) XXXXX-XXXX" 
                      value={field.value}
                      onChange={(e) => handlePhoneChange(e.target.value, field.onChange)}
                      disabled={isSubmitting}
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

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-calculator-blue hover:bg-calculator-blue-dark"
              >
                {isSubmitting ? "Processando..." : "🚀 Ver Resultados"}
>>>>>>> Stashed changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});

LeadCaptureForm.displayName = 'LeadCaptureForm';
