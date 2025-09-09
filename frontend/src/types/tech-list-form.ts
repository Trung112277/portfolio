export type TechListFormInputs = {
  image: FileList;
  name: string;
  category: string;
  color: string;
};

export interface TechListFormProps {
  initialData?: Partial<TechListFormInputs>;
  onSubmit?: (data: TechListFormInputs, image: File | null) => Promise<void>;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
