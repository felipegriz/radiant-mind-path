export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_training_content: {
        Row: {
          active: boolean | null
          category: string
          content: string
          created_at: string
          id: string
          keywords: string[] | null
          title: string
        }
        Insert: {
          active?: boolean | null
          category: string
          content: string
          created_at?: string
          id?: string
          keywords?: string[] | null
          title: string
        }
        Update: {
          active?: boolean | null
          category?: string
          content?: string
          created_at?: string
          id?: string
          keywords?: string[] | null
          title?: string
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          created_at: string | null
          enrollment_date: string | null
          id: string
          notes: string | null
          payment_plan: string | null
          program_id: string | null
          status: Database["public"]["Enums"]["enrollment_status"] | null
          student_id: string | null
          total_amount: number | null
        }
        Insert: {
          created_at?: string | null
          enrollment_date?: string | null
          id?: string
          notes?: string | null
          payment_plan?: string | null
          program_id?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          student_id?: string | null
          total_amount?: number | null
        }
        Update: {
          created_at?: string | null
          enrollment_date?: string | null
          id?: string
          notes?: string | null
          payment_plan?: string | null
          program_id?: string | null
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          student_id?: string | null
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      event_cohorts: {
        Row: {
          cohort_name: string
          created_at: string | null
          end_date: string
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          is_active: boolean | null
          start_date: string
        }
        Insert: {
          cohort_name: string
          created_at?: string | null
          end_date: string
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          is_active?: boolean | null
          start_date: string
        }
        Update: {
          cohort_name?: string
          created_at?: string | null
          end_date?: string
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          is_active?: boolean | null
          start_date?: string
        }
        Relationships: []
      }
      event_content_modules: {
        Row: {
          created_at: string | null
          description: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          icon: string
          id: string
          link: string
          required_status: string[] | null
          sequence_order: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_type: Database["public"]["Enums"]["event_type"]
          icon: string
          id?: string
          link: string
          required_status?: string[] | null
          sequence_order?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_type?: Database["public"]["Enums"]["event_type"]
          icon?: string
          id?: string
          link?: string
          required_status?: string[] | null
          sequence_order?: number | null
          title?: string
        }
        Relationships: []
      }
      event_prices: {
        Row: {
          created_at: string
          currency: string
          event_name: string
          id: string
          is_active: boolean
          price_amount: number
          ticket_description: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          event_name: string
          id?: string
          is_active?: boolean
          price_amount: number
          ticket_description?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          event_name?: string
          id?: string
          is_active?: boolean
          price_amount?: number
          ticket_description?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      event_purchases: {
        Row: {
          cohort_id: string | null
          created_at: string | null
          id: string
          purchase_date: string | null
          status: string | null
          stripe_session_id: string | null
          user_id: string | null
        }
        Insert: {
          cohort_id?: string | null
          created_at?: string | null
          id?: string
          purchase_date?: string | null
          status?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Update: {
          cohort_id?: string | null
          created_at?: string | null
          id?: string
          purchase_date?: string | null
          status?: string | null
          stripe_session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_purchases_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "event_cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          nickname: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          nickname?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          nickname?: string | null
        }
        Relationships: []
      }
      program_modules: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          program_id: string | null
          sequence_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          program_id?: string | null
          sequence_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          program_id?: string | null
          sequence_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_modules_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      program_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          is_recurring: boolean | null
          location: string | null
          max_participants: number | null
          program_id: string | null
          recurring_day: string | null
          recurring_time: string | null
          session_date: string | null
          session_type: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          max_participants?: number | null
          program_id?: string | null
          recurring_day?: string | null
          recurring_time?: string | null
          session_date?: string | null
          session_type: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          is_recurring?: boolean | null
          location?: string | null
          max_participants?: number | null
          program_id?: string | null
          recurring_day?: string | null
          recurring_time?: string | null
          session_date?: string | null
          session_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string | null
          description: string | null
          duration_months: number | null
          id: string
          is_premium: boolean | null
          name: string
          pillar: Database["public"]["Enums"]["program_pillar"]
          status: Database["public"]["Enums"]["program_status"] | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_months?: number | null
          id?: string
          is_premium?: boolean | null
          name: string
          pillar: Database["public"]["Enums"]["program_pillar"]
          status?: Database["public"]["Enums"]["program_status"] | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_months?: number | null
          id?: string
          is_premium?: boolean | null
          name?: string
          pillar?: Database["public"]["Enums"]["program_pillar"]
          status?: Database["public"]["Enums"]["program_status"] | null
        }
        Relationships: []
      }
      prospects: {
        Row: {
          conversion_date: string | null
          created_at: string
          email: string
          id: string
          notes: string | null
          source: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          conversion_date?: string | null
          created_at?: string
          email: string
          id?: string
          notes?: string | null
          source?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          conversion_date?: string | null
          created_at?: string
          email?: string
          id?: string
          notes?: string | null
          source?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      session_attendance: {
        Row: {
          attendance_date: string | null
          created_at: string | null
          id: string
          notes: string | null
          session_id: string | null
          status: string | null
          student_id: string | null
        }
        Insert: {
          attendance_date?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          session_id?: string | null
          status?: string | null
          student_id?: string | null
        }
        Update: {
          attendance_date?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          session_id?: string | null
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "program_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_progress: {
        Row: {
          completion_date: string | null
          created_at: string | null
          enrollment_id: string | null
          id: string
          module_id: string | null
          notes: string | null
          status: string | null
        }
        Insert: {
          completion_date?: string | null
          created_at?: string | null
          enrollment_id?: string | null
          id?: string
          module_id?: string | null
          notes?: string | null
          status?: string | null
        }
        Update: {
          completion_date?: string | null
          created_at?: string | null
          enrollment_id?: string | null
          id?: string
          module_id?: string | null
          notes?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_progress_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "program_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          email: string
          enrollment_date: string | null
          full_name: string
          id: string
          last_contact: string | null
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          enrollment_date?: string | null
          full_name: string
          id?: string
          last_contact?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          enrollment_date?: string | null
          full_name?: string
          id?: string
          last_contact?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      survey_questions: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          options: Json | null
          question: string
          sequence_order: number | null
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          options?: Json | null
          question: string
          sequence_order?: number | null
          type?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          options?: Json | null
          question?: string
          sequence_order?: number | null
          type?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          created_at: string | null
          id: string
          prospect_id: string | null
          question_id: string | null
          response: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          prospect_id?: string | null
          question_id?: string | null
          response: string
        }
        Update: {
          created_at?: string | null
          id?: string
          prospect_id?: string | null
          question_id?: string | null
          response?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "survey_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_event_access: {
        Row: {
          access_granted_at: string | null
          attendance_date: string | null
          cohort_id: string | null
          created_at: string | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          access_granted_at?: string | null
          attendance_date?: string | null
          cohort_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          access_granted_at?: string | null
          attendance_date?: string | null
          cohort_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_event_access_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "event_cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_event_access: {
        Args: {
          user_uuid: string
          required_status: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      enrollment_status: "active" | "completed" | "cancelled" | "pending"
      event_type: "despertar_360" | "cita_con_lo_imposible" | "mission_mastery"
      program_pillar: "inmersion" | "recondicionamiento" | "personalizacion"
      program_status: "active" | "inactive" | "coming_soon"
      user_role: "admin" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
