export type SocialMediaFormInputs = {
    image: FileList;
    description: string;
    link: string;
    color: string;
  };
  
  export interface SocialMediaFormProps {
    mode?: "add" | "edit";
    initialData?: Partial<SocialMediaFormInputs>;
    onSubmit?: (data: SocialMediaFormInputs, image: File | null) => Promise<void>;
    onCancel?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
  
  export interface EditSocialMediaFormProps {
    socialMediaId: string;
    initialData: Partial<SocialMediaFormInputs>;
    onUpdate?: (id: string, data: SocialMediaFormInputs, image: File | null) => Promise<void>;
  }
  