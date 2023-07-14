import { useState, useEffect } from "react";
import { useToast } from "./useToast.hook";
type ErrorType = any | null;

export const useErrorHandler = <T>(
  api: () => Promise<T>,
  refreshKey?: any[],
  options?: {
    showSuccessFetchingMessage?: {
      show?: boolean;
      message?: string;
      description?: string;
    };
    showErrorToast?: boolean;
  }
): { data: T | null; error: ErrorType; reload: () => void } => {
  const toast = useToast();

  const keys = refreshKey ? refreshKey : [];
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<ErrorType>(null);

  const fetchData = async () => {
    try {
      const data = await api();
      setResult(data);

      if (options?.showSuccessFetchingMessage?.show) {
        toast.showSuccessToast(
          options?.showSuccessFetchingMessage?.message || "",
          options?.showSuccessFetchingMessage?.description || ""
        );
      }
    } catch (error: any) {
      if (options?.showErrorToast) {
        toast.showErrorToast("เกิดข้อผิดพลาด", error?.message || "");
      }
      setError(error);
    }
  };

  const reload = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [...keys]);

  return {
    data: result,
    error,
    reload,
  };
};
