
import { supabase } from "@/integrations/supabase/client";
import { LeadCaptureFormValues } from './FormValidation';

// ✅ URL única para todas as calculadoras
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEOHIP-UCX_nHRD0_jsTY9YncsWhCENXFl_sxcxmQdRJR6Bq5g0z5LfA66JEyfpybREA/exec';

// Adicionar interface para o dataLayer do Google Tag Manager na window
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const submitFormData = async (values: LeadCaptureFormValues, source: string) => {
  const phoneFormatted = values.phone;
  
  console.log('Dados a serem enviados:', {
    Name: values.name,
    email: values.email,
    phone: phoneFormatted,
    patrimonio: values.patrimonio,
    calculadora: source,
    "Interesse em dados": values.interesseDados,
    "Chatgpt": values.chatgpt,
    "Se sentiu enganado": values.sentiuEnganado
  });
  
  // Inserir dados no Supabase
  const { error: supabaseError } = await supabase
    .from('Calculadoras')
    .insert({
      Name: values.name,
      email: values.email,
      phone: phoneFormatted,
      patrimonio: values.patrimonio,
      calculadora: source,
      "Interesse em dados": values.interesseDados,
      "Chatgpt": values.chatgpt,
      "Se sentiu enganado": values.sentiuEnganado
    });

  if (supabaseError) {
    console.error('Erro ao salvar no Supabase:', supabaseError);
    throw new Error('Não foi possível salvar seus dados. Tente novamente.');
  }

  console.log('Dados salvos no Supabase com sucesso!');

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
          source,
          interesseDados: values.interesseDados,
          chatgpt: values.chatgpt,
          sentiuEnganado: values.sentiuEnganado,
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
    
    console.log('Dados enviados para o dataLayer:', {
      event: 'lead_capture_success',
      user_data: {
        em: values.email,
        ph: values.phone,
      }
    });
  }
};
