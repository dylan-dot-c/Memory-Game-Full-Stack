export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type Database = {
    public: {
        Tables: {
            Countries: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            difficulty: {
                Row: {
                    cards: number;
                    id: number;
                    name: string;
                };
                Insert: {
                    cards: number;
                    id?: number;
                    name: string;
                };
                Update: {
                    cards?: number;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            scores: {
                Row: {
                    created_at: string;
                    difficulty: number;
                    flips: number;
                    score_id: number;
                    seconds: number;
                    user_id: number;
                };
                Insert: {
                    created_at?: string;
                    difficulty: number;
                    flips: number;
                    score_id?: number;
                    seconds: number;
                    user_id: number;
                };
                Update: {
                    created_at?: string;
                    difficulty?: number;
                    flips?: number;
                    score_id?: number;
                    seconds?: number;
                    user_id?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: "public_scores_difficulty_fkey";
                        columns: ["difficulty"];
                        isOneToOne: false;
                        referencedRelation: "difficulty";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "public_scores_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            users: {
                Row: {
                    created_at: string;
                    id: number;
                    username: string | null;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    username?: string | null;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    username?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
          PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
          PublicSchema["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends
        | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
