import { useToast as chakraUseToast, UseToastOptions } from "@chakra-ui/react";

type ToastFunctions = {
  [key: string]: (message: string, options?: UseToastOptions) => void;
};

export const useToast = (): ToastFunctions => {
  const toast = chakraUseToast();

  const showToast = (
    status: "success" | "info" | "warning" | "error" | "loading" | undefined,
    message: string,
    options?: UseToastOptions
  ): void => {
    toast({
      title: message,
      position: "bottom-right",
      duration: 3000,
      isClosable: true,
      status,
      ...options,
    });
  };

  return {
    showSuccessToast: (message: string, options?: UseToastOptions): void => {
      showToast("success", message, options);
    },
    showWarningToast: (message: string, options?: UseToastOptions): void => {
      showToast("warning", message, options);
    },
    showErrorToast: (message: string, options?: UseToastOptions): void => {
      showToast("error", message, options);
    },
  };
};
