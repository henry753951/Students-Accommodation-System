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
      app_user: {
        Row: {
          created_at: string | null
          email: string | null
          first_time: boolean
          id: string
          name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_time?: boolean
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_time?: boolean
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comment: {
        Row: {
          comment: string | null
          creared: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          creared?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Update: {
          comment?: string | null
          creared?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_record: {
        Row: {
          landlord_id: string | null
          landlord_name: string | null
          landlord_number: string | null
          property_id: string | null
          record_link: string
          record_time: string
          response: Json | null
          student_id: string
          teacher_id: string
        }
        Insert: {
          landlord_id?: string | null
          landlord_name?: string | null
          landlord_number?: string | null
          property_id?: string | null
          record_link?: string
          record_time?: string
          response?: Json | null
          student_id?: string
          teacher_id?: string
        }
        Update: {
          landlord_id?: string | null
          landlord_name?: string | null
          landlord_number?: string | null
          property_id?: string | null
          record_link?: string
          record_time?: string
          response?: Json | null
          student_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_record_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "landlord"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_record_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "rental_property"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_record_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "interview_record_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["user_id"]
          },
        ]
      }
      landlord: {
        Row: {
          created_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "landlord_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      map_rental_property_student: {
        Row: {
          created_at: string | null
          id: string
          is_currently_renting: boolean
          name: string
          rental_property_id: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_currently_renting?: boolean
          name?: string
          rental_property_id: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_currently_renting?: boolean
          name?: string
          rental_property_id?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "map_rental_property_student_rental_property_id_fkey"
            columns: ["rental_property_id"]
            isOneToOne: false
            referencedRelation: "rental_property"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_rental_property_student_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      map_teacher_student: {
        Row: {
          created_at: string | null
          id: string
          student_id: string
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          student_id: string
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          student_id?: string
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "map_teacher_student_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "map_teacher_student_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["user_id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created: string | null
          id: string
          location_id: string
          title: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created?: string | null
          id?: string
          location_id?: string
          title?: string | null
          user_id?: string
        }
        Update: {
          content?: string | null
          created?: string | null
          id?: string
          location_id?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "rental_property"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_property: {
        Row: {
          address: string
          comment: string | null
          created_at: string | null
          id: string
          landlord_id: string | null
          score: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          comment?: string | null
          created_at?: string | null
          id?: string
          landlord_id?: string | null
          score?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          landlord_id?: string | null
          score?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_property_landlord_id_fkey"
            columns: ["landlord_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      rental_property_info: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean
          price: number
          property_attributes: Json | null
          rental_property_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          price: number
          property_attributes?: Json | null
          rental_property_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          price?: number
          property_attributes?: Json | null
          rental_property_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_property_info_rental_property_id_fkey"
            columns: ["rental_property_id"]
            isOneToOne: false
            referencedRelation: "rental_property"
            referencedColumns: ["id"]
          },
        ]
      }
      school_department: {
        Row: {
          created_at: string | null
          department_code: string | null
          department_name: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_code?: string | null
          department_name: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_code?: string | null
          department_name?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      student: {
        Row: {
          created_at: string | null
          department_id: string | null
          student_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          student_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          student_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "school_department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher: {
        Row: {
          created_at: string | null
          department_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string | null
          department_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "school_department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      userimport: {
        Row: {
          data: Json | null
          email_address: string
          id: number
        }
        Insert: {
          data?: Json | null
          email_address: string
          id?: never
        }
        Update: {
          data?: Json | null
          email_address?: string
          id?: never
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
