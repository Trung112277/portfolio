export interface Database {
  public: {
    Tables: {
      auth_name: {
        Row: {
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      introduction: {
        Row: {
          introduction: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          introduction: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          introduction?: string;
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
          description: string;
          link: string;
          color: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          image_url: string;
          description: string;
          link: string;
          color: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          image_url?: string;
          description?: string;
          link?: string;
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
          user_role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name: string;
          user_role: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          user_role?: string;
          updated_at?: string;
        };
      };
      work_experience: {
        Row: {
          id: number;
          position: string;
          company_name: string;
          year: string;
          work_arrangement: string;
          tech_stack: string;
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          position: string;
          company_name: string;
          year: string;
          work_arrangement: string;
          tech_stack: string;
          description: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          position?: string;
          company_name?: string;
          year?: string;
          work_arrangement?: string;
          tech_stack?: string;
          description?: string;
          updated_at?: string;
        };
      };
    };
  };
}
