import { ErrorValidationMessage } from "@/constants/error-validation.constant";

export const handleErrorValidation = (
  name: string,
  type: string,
  errorMessage: string,
  arg?: string | number | null | undefined
) => {
  if (type === "manual") {
    return errorMessage;
  }

  const validator = ErrorValidationMessage[type];

  if (validator) {
    if (arg) {
      return validator(name, arg);
    }
    return validator(name);
  }

  return;
};
