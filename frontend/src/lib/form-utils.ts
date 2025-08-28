import { FORM_CONSTANTS } from "@/constant/form-constants";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const triggerValidationWithDelay = (
  trigger: (name?: string) => Promise<boolean>,
  fieldName?: string,
  delayMs: number = FORM_CONSTANTS.TIMING.VALIDATION_DELAY
) => {
  setTimeout(() => {
    trigger(fieldName);
  }, delayMs);
};

export const simulateApiCall = async (delayMs: number = FORM_CONSTANTS.TIMING.API_SIMULATION_DELAY) => {
  await delay(delayMs);
};

export const getSuccessMessage = (mode: "add" | "edit") => {
  return mode === "edit" 
    ? FORM_CONSTANTS.MESSAGES.SUCCESS.UPDATE 
    : FORM_CONSTANTS.MESSAGES.SUCCESS.ADD;
};

export const getErrorMessage = (mode: "add" | "edit") => {
  return mode === "edit" 
    ? FORM_CONSTANTS.MESSAGES.ERROR.UPDATE 
    : FORM_CONSTANTS.MESSAGES.ERROR.ADD;
};