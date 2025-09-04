export interface WorkExperienceFormInputs {
    position: string;
    companyName: string;
    year: string;
    workArrangement: string;
    techStack: string;
    description: string;
  }
  
  export interface WorkExperienceFormProps {
    mode?: "add" | "edit";
    initialData?: Partial<WorkExperienceFormInputs>;
    onSubmit?: (data: WorkExperienceFormInputs) => Promise<void>;
    onCancel?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }