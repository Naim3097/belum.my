export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          category: Database["public"]["Enums"]["activity_category"]
          description: string | null
          difficulty: Database["public"]["Enums"]["activity_difficulty"]
          duration: string | null
          id: string
          image: string | null
          included: boolean
          price: number
          slug: string
          title: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["activity_category"]
          description?: string | null
          difficulty?: Database["public"]["Enums"]["activity_difficulty"]
          duration?: string | null
          id?: string
          image?: string | null
          included?: boolean
          price?: number
          slug: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["activity_category"]
          description?: string | null
          difficulty?: Database["public"]["Enums"]["activity_difficulty"]
          duration?: string | null
          id?: string
          image?: string | null
          included?: boolean
          price?: number
          slug?: string
          title?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          base_price: number
          checkin: string | null
          checkout: string | null
          created_at: string
          currency: string
          customer_id: string | null
          guest_email: string | null
          guest_name: string | null
          guest_phone: string | null
          guests_count: number
          id: string
          nights: number | null
          operator_id: string | null
          package_id: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          permit_fee: number
          service_fee: number
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
        }
        Insert: {
          base_price: number
          checkin?: string | null
          checkout?: string | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guests_count?: number
          id?: string
          nights?: number | null
          operator_id?: string | null
          package_id?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          permit_fee?: number
          service_fee?: number
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount: number
        }
        Update: {
          base_price?: number
          checkin?: string | null
          checkout?: string | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          guest_email?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guests_count?: number
          id?: string
          nights?: number | null
          operator_id?: string | null
          package_id?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          permit_fee?: number
          service_fee?: number
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          operator_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          operator_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          operator_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      operator_leanx: {
        Row: {
          api_key: string | null
          collection_uuid: string | null
          enabled: boolean
          environment: string
          merchant_id: string | null
          operator_id: string
          secret_key: string | null
          updated_at: string
        }
        Insert: {
          api_key?: string | null
          collection_uuid?: string | null
          enabled?: boolean
          environment?: string
          merchant_id?: string | null
          operator_id: string
          secret_key?: string | null
          updated_at?: string
        }
        Update: {
          api_key?: string | null
          collection_uuid?: string | null
          enabled?: boolean
          environment?: string
          merchant_id?: string | null
          operator_id?: string
          secret_key?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "operator_leanx_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: true
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      operators: {
        Row: {
          amenities: string[]
          capacity: number | null
          captain: string | null
          captain_bio: string | null
          category: Database["public"]["Enums"]["operator_category"]
          created_at: string
          description: string | null
          gallery: string[]
          id: string
          image: string | null
          is_published: boolean
          joined_year: number | null
          location: string | null
          long_description: string | null
          name: string
          owner_id: string | null
          rating: number
          response_rate: number | null
          response_time: string | null
          reviews_count: number
          slug: string
          tagline: string | null
          verified: boolean
        }
        Insert: {
          amenities?: string[]
          capacity?: number | null
          captain?: string | null
          captain_bio?: string | null
          category?: Database["public"]["Enums"]["operator_category"]
          created_at?: string
          description?: string | null
          gallery?: string[]
          id?: string
          image?: string | null
          is_published?: boolean
          joined_year?: number | null
          location?: string | null
          long_description?: string | null
          name: string
          owner_id?: string | null
          rating?: number
          response_rate?: number | null
          response_time?: string | null
          reviews_count?: number
          slug: string
          tagline?: string | null
          verified?: boolean
        }
        Update: {
          amenities?: string[]
          capacity?: number | null
          captain?: string | null
          captain_bio?: string | null
          category?: Database["public"]["Enums"]["operator_category"]
          created_at?: string
          description?: string | null
          gallery?: string[]
          id?: string
          image?: string | null
          is_published?: boolean
          joined_year?: number | null
          location?: string | null
          long_description?: string | null
          name?: string
          owner_id?: string | null
          rating?: number
          response_rate?: number | null
          response_time?: string | null
          reviews_count?: number
          slug?: string
          tagline?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "operators_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          created_at: string
          duration: string | null
          highlights: string[]
          id: string
          image: string | null
          is_active: boolean
          name: string
          operator_id: string
          pax: number
          price: number
        }
        Insert: {
          created_at?: string
          duration?: string | null
          highlights?: string[]
          id?: string
          image?: string | null
          is_active?: boolean
          name: string
          operator_id: string
          pax?: number
          price: number
        }
        Update: {
          created_at?: string
          duration?: string | null
          highlights?: string[]
          id?: string
          image?: string | null
          is_active?: boolean
          name?: string
          operator_id?: string
          pax?: number
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "packages_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string
          customer_id: string | null
          id: string
          operator_id: string
          rating: number
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          operator_id: string
          rating: number
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          operator_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          booking_id: string | null
          completed_at: string | null
          created_at: string
          currency: string
          id: string
          method: string | null
          order_id: string | null
          provider: string
          provider_ref: string | null
          raw_payload: Json | null
          redirect_url: string | null
          status: Database["public"]["Enums"]["transaction_status"]
        }
        Insert: {
          amount: number
          booking_id?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          method?: string | null
          order_id?: string | null
          provider?: string
          provider_ref?: string | null
          raw_payload?: Json | null
          redirect_url?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
        }
        Update: {
          amount?: number
          booking_id?: string | null
          completed_at?: string | null
          created_at?: string
          currency?: string
          id?: string
          method?: string | null
          order_id?: string | null
          provider?: string
          provider_ref?: string | null
          raw_payload?: Json | null
          redirect_url?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
        }
        Relationships: [
          {
            foreignKeyName: "transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_category: "Water" | "Jungle" | "Culture" | "Wildlife"
      activity_difficulty: "Easy" | "Moderate" | "Challenging"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      operator_category:
        | "Houseboat"
        | "Adventure"
        | "Eco"
        | "Family"
        | "Fishing"
      payment_status: "unpaid" | "paid" | "refunded"
      transaction_status:
        | "pending"
        | "succeeded"
        | "failed"
        | "refunded"
        | "processing"
        | "completed"
        | "cancelled"
      user_role: "customer" | "operator" | "admin"
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
    Enums: {
      activity_category: ["Water", "Jungle", "Culture", "Wildlife"],
      activity_difficulty: ["Easy", "Moderate", "Challenging"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      operator_category: ["Houseboat", "Adventure", "Eco", "Family", "Fishing"],
      payment_status: ["unpaid", "paid", "refunded"],
      transaction_status: [
        "pending",
        "succeeded",
        "failed",
        "refunded",
        "processing",
        "completed",
        "cancelled",
      ],
      user_role: ["customer", "operator", "admin"],
    },
  },
} as const

// ── Convenience aliases (hand-added, not from the generator) ──
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"]
export type OperatorRow = Database["public"]["Tables"]["operators"]["Row"]
export type PackageRow = Database["public"]["Tables"]["packages"]["Row"]
export type ActivityRow = Database["public"]["Tables"]["activities"]["Row"]
export type BookingRow = Database["public"]["Tables"]["bookings"]["Row"]
export type TransactionRow = Database["public"]["Tables"]["transactions"]["Row"]
export type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"]
export type FavoriteRow = Database["public"]["Tables"]["favorites"]["Row"]
export type OperatorLeanxRow =
  Database["public"]["Tables"]["operator_leanx"]["Row"]

export type UserRole = Database["public"]["Enums"]["user_role"]
export type OperatorCategory = Database["public"]["Enums"]["operator_category"]
export type ActivityDifficulty = Database["public"]["Enums"]["activity_difficulty"]
export type ActivityCategory = Database["public"]["Enums"]["activity_category"]
export type BookingStatus = Database["public"]["Enums"]["booking_status"]
export type PaymentStatus = Database["public"]["Enums"]["payment_status"]
export type TransactionStatus = Database["public"]["Enums"]["transaction_status"]
