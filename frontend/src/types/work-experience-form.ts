export interface WorkExperienceFormInputs {
    position: string;
    companyName: string;
    startYear: string;
    endYear: string;
    workArrangement: string;
    techStack: string;
    description: string;
  }
  
  export interface WorkExperienceFormProps {
    initialData?: Partial<WorkExperienceFormInputs>;
    onSubmit?: (data: WorkExperienceFormInputs) => Promise<void>;
    onCancel?: () => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }