
import React, { useState } from 'react';
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
      phone: "+55 ",
      patrimonio: "",
      chatgpt: "",
    },
  });

  async function onSubmit(values: LeadCaptureFormValues) {
    setIsSubmitting(true);
    try {
      await submitFormData(values, source);

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
        className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto"
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
            <FormFields control={form.control} isSubmitting={isSubmitting} />
            <PrivacyNotice />
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
