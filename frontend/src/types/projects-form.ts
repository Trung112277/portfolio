export type ProjectsFormInputs = {
  name: string;
  description: string;
  link: string;
  color: string;
};

export interface ProjectsFormProps {
  initialData?: Partial<ProjectsFormInputs>;
  onSubmit?: (data: ProjectsFormInputs) => Promise<void>;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface EditProjectsFormProps {
  projectsId: string;
  initialData: Partial<ProjectsFormInputs>;
  onUpdate?: (
    id: string,
    data: ProjectsFormInputs,
  ) => Promise<void>;
}
