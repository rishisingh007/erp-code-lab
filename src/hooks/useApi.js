import { useLoading } from "../context/LoadingProvider";
import { useNotification } from "../context/NotificationProvider";

export default function useApi() {

  const { setLoading } = useLoading();
  const { showError, showSuccess } = useNotification();

  const execute = async (apiCall, options = {}) => {

    const {
      successMessage,
      errorMessage = "Something went wrong",
      showLoader = true
    } = options;

    try {

      if (showLoader) setLoading(true);

      const result = await apiCall();

      if (successMessage) {
        showSuccess(successMessage);
      }

      return result;

    } catch (error) {

      const message =
        error?.response?.data?.message ||
        error?.message ||
        errorMessage;

      showError(message);

      throw error;

    } finally {

      if (showLoader) setLoading(false);

    }
  };

  return { execute };
}