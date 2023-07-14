import { useToast as chakraUseToast, UseToastOptions } from "@chakra-ui/react";

type ToastFunctions = {
  [key: string]: (
    message: string,
    description?: string,
    options?: UseToastOptions
  ) => void;
};

export const useToast = (): ToastFunctions => {
  const toast = chakraUseToast();

  const showToast = (
    status: "success" | "info" | "warning" | "error" | "loading" | undefined,
    message: string,
    description?: string,
    options?: UseToastOptions
  ): void => {
    toast({
      title: message,
      description: description || "",
      position: "bottom-right",
      duration: 3000,
      isClosable: true,
      status,
      ...options,
    });
  };

  return {
    showSuccessToast: (
      message: string,
      description?: string,
      options?: UseToastOptions
    ): void => {
      showToast("success", message, description, options);
    },
    showWarningToast: (
      message: string,
      description?: string,
      options?: UseToastOptions
    ): void => {
      showToast("warning", message, description, options);
    },
    showErrorToast: (
      message: string,
      description?: string,
      options?: UseToastOptions
    ): void => {
      showToast("error", message, description, options);
    },
  };
};
