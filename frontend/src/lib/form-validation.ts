import { FORM_CONSTANTS } from "@/constant/form-constants";
import { SocialMediaFormInputs } from "@/types/social-media-form";

export type ValidationSchema = {
  required?: string | boolean;
  minLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: unknown) => boolean | string; 
};


export const validationSchemas = {
  description: {
    required: FORM_CONSTANTS.VALIDATION.DESCRIPTION.REQUIRED_MESSAGE,
    minLength: {
      value: FORM_CONSTANTS.VALIDATION.DESCRIPTION.MIN_LENGTH,
      message: FORM_CONSTANTS.VALIDATION.DESCRIPTION.MIN_LENGTH_MESSAGE,
    },
  },
  link: {
    required: FORM_CONSTANTS.VALIDATION.LINK.REQUIRED_MESSAGE,
    pattern: {
      value: FORM_CONSTANTS.VALIDATION.LINK.PATTERN,
      message: FORM_CONSTANTS.VALIDATION.LINK.PATTERN_MESSAGE,
    },
  },
  color: {
    required: FORM_CONSTANTS.VALIDATION.COLOR.REQUIRED_MESSAGE,
    pattern: {
      value: FORM_CONSTANTS.VALIDATION.COLOR.PATTERN,
      message: FORM_CONSTANTS.VALIDATION.COLOR.PATTERN_MESSAGE,
    },
  },
  image: {
    validate: (value: FileList) => {
      // This will be handled by the component state
      return true;
    },
  },
} as const;

export const getFieldValidation = (fieldName: keyof SocialMediaFormInputs): ValidationSchema => {
  return validationSchemas[fieldName] as ValidationSchema;
};
