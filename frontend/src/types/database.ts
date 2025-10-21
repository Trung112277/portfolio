export interface Database {
  public: {
    Tables: {
      author_name: {
        Row: {
          id: number;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      introduction: {
        Row: {
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: number;
          name: string;
          description: string;
          link: string;
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description: string;
          link: string;
          color: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string;
          link?: string;
          color?: string;
          updated_at?: string;
        };
      };
      social_media: {
        Row: {
          id: number;
          image_url: string;
          description: string;
          link: string;
          color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          image_url: string;
          description: string;
          link: string;
          color: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          image_url?: string;
          description?: string;
          link?: string;
          color?: string;
          updated_at?: string;
        };
      };
      tech_stack: {
        Row: {
          id: number;
          image_url: string;
          name: string;
          color: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          image_url: string;
          name: string;
          color: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          image_url?: string;
          name?: string;
          color?: string;
          category?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          user_role: 'admin' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name: string;
          user_role: 'admin' | 'user';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          user_role?: 'admin' | 'user';
          updated_at?: string;
        };
      };
      work_experience: {
        Row: {
          id: string; // UUID
          position: string;
          company_name: string;
          start_year: number; // int4
          end_year: number; // int4
          work_arrangement: string;
          tech_stack: string[]; // text[]
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string; // UUID
          position: string;
          company_name: string;
          start_year: number; // int4
          end_year: number; // int4
          work_arrangement: string;
          tech_stack: string[]; // text[]
          description: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string; // UUID
          position?: string;
          company_name?: string;
          start_year?: number; // int4
          end_year?: number; // int4
          work_arrangement?: string;
          tech_stack?: string[]; // text[]
          description?: string;
          updated_at?: string;
        };
      };
    };
  };
}
