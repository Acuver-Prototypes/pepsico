import { useCallback } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const useToast = () => {
  const showSuccess = useCallback((msg: string) => {
    toast.success(msg, {
      toastId: uuidv4(),
    });
  }, []);

  const showError = useCallback((msg: string) => {
    toast.error(msg, {
      toastId: uuidv4(),
    });
  }, []);

  const showInfo = useCallback((msg: string) => {
    toast.info(msg, {
      toastId: uuidv4(),
    });
  }, []);

  const showWarning = useCallback((msg: string) => {
    toast.warning(msg, {
      toastId: uuidv4(),
    });
  }, []);

  const showDefault = useCallback((msg: string) => {
    toast(msg, {
      toastId: uuidv4(),
    });
  }, []);

  return {
    showDefault,
    showError,
    showInfo,
    showSuccess,
    showWarning,
  };
};

export default useToast;
