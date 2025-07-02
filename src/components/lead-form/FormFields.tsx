import React from 'react';
import { Control } from 'react-hook-form';
import {
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
import { formatPhoneNumber } from './PhoneFormatter';
import { LeadCaptureFormValues } from './FormValidation';

interface FormFieldsProps {
  control: Control<LeadCaptureFormValues>;
  isSubmitting: boolean;
}

export const FormFields: React.FC<FormFieldsProps> = ({ control, isSubmitting }) => {
  const handlePhoneChange = (value: string, onChange: (value: string) => void) => {
    const formatted = formatPhoneNumber(value);
    onChange(formatted);
  };

  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
        name="chatgpt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Usa o ChatGPT?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="muito-diariamente">Muito, diariamente</SelectItem>
                <SelectItem value="medio-semanalmente">Médio, semanalmente</SelectItem>
                <SelectItem value="pouco-mensalmente">Pouco, mensalmente</SelectItem>
                <SelectItem value="nao-uso">Não uso</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
