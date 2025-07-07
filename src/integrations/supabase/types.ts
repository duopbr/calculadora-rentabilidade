export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      assessores: {
        Row: {
          celular: string
          created_at: string | null
          id: number
          nome: string
        }
        Insert: {
          celular: string
          created_at?: string | null
          id?: number
          nome: string
        }
        Update: {
          celular?: string
          created_at?: string | null
          id?: number
          nome?: string
        }
        Relationships: []
      }
      Calculadoras: {
        Row: {
          calculadora: string | null
          Chatgpt: string | null
          Contato: string | null
          created_at: string
          email: string | null
          id: number
          "Interesse em dados": string | null
          "Média de Mensagens por Conversas": string | null
          Name: string | null
          Nota: string | null
          "Numero de Conversas": string | null
          patrimonio: string | null
          phone: string | null
          "Se sentiu enganado": string | null
          valor_mes: string | null
        }
        Insert: {
          calculadora?: string | null
          Chatgpt?: string | null
          Contato?: string | null
          created_at?: string
          email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Média de Mensagens por Conversas"?: string | null
          Name?: string | null
          Nota?: string | null
          "Numero de Conversas"?: string | null
          patrimonio?: string | null
          phone?: string | null
          "Se sentiu enganado"?: string | null
          valor_mes?: string | null
        }
        Update: {
          calculadora?: string | null
          Chatgpt?: string | null
          Contato?: string | null
          created_at?: string
          email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Média de Mensagens por Conversas"?: string | null
          Name?: string | null
          Nota?: string | null
          "Numero de Conversas"?: string | null
          patrimonio?: string | null
          phone?: string | null
          "Se sentiu enganado"?: string | null
          valor_mes?: string | null
        }
        Relationships: []
      }
      checkout_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          payment_method: string
          phone: string | null
          plan_price: string
          plan_title: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          payment_method: string
          phone?: string | null
          plan_price: string
          plan_title: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          payment_method?: string
          phone?: string | null
          plan_price?: string
          plan_title?: string
        }
        Relationships: []
      }
      pix_phone_submissions: {
        Row: {
          Chatgpt: string | null
          Email: string | null
          id: number
          "Interesse em dados": string | null
          "Investir Mês": string | null
          "Ja foi contatado?": string | null
          Patrimonio: string | null
          phone_number: string | null
          plan_title: string | null
          "Se sentiu enganado": string | null
          submitted_at: string | null
        }
        Insert: {
          Chatgpt?: string | null
          Email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Investir Mês"?: string | null
          "Ja foi contatado?"?: string | null
          Patrimonio?: string | null
          phone_number?: string | null
          plan_title?: string | null
          "Se sentiu enganado"?: string | null
          submitted_at?: string | null
        }
        Update: {
          Chatgpt?: string | null
          Email?: string | null
          id?: number
          "Interesse em dados"?: string | null
          "Investir Mês"?: string | null
          "Ja foi contatado?"?: string | null
          Patrimonio?: string | null
          phone_number?: string | null
          plan_title?: string | null
          "Se sentiu enganado"?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
