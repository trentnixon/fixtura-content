import { useState, useEffect } from "react";
import { fetcher } from "@/utils/fetcher";

// Utils
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// HOOKS

// Create a new Article
export function useRewrite() {
  const [rewriteStatus, setRewriteStatus] = useState({
    isLoading: false,
    error: null,
    success: false,
  });

  async function requestRewrite(ID) {
    setRewriteStatus({ ...rewriteStatus, isLoading: true });
    try {
      const response = await fetcher({
        PATH: `gtp-3-report/rewrite/${ID}`,
      });
      // Assuming 'istrue' is a success flag in the response

      if (response.data.istrue) {
        setRewriteStatus({
          isLoading: false,
          error: null,
          success: true,
          RequestResponse: response.data.RequestResponse,
        });
      } else {
        setRewriteStatus({
          isLoading: false,
          error: "Rewrite request failed",
          success: false,
        });
      }
    } catch (error) {
      setRewriteStatus({
        isLoading: false,
        error: error.message,
        success: false,
      });
    }
  }

  const resetRewriteStatus = () => {
    setRewriteStatus({
      isLoading: false,
      error: null,
      success: false,
    });
  };

  return [rewriteStatus, requestRewrite, resetRewriteStatus];
}

// Poll Strapi for the new Article
export function usePollRewrite(id, isPending) {
  const [startPolling, setStartPolling] = useState(null);

  useEffect(() => {
    let interval;
    //console.log('isPending ', isPending)
    if (isPending === true) {
      const fetchArticle = async () => {
        interval = setInterval(async () => {
          const statusResponse = await fetcher({
            PATH: `gtp-3-report/polling/${id}`,
          });
          const statusData = await statusResponse.data;

          if (statusData && !statusData.pending) {
            clearInterval(interval);
            setStartPolling(statusData.article);
          }
        }, 5000);
      };
      fetchArticle();
    }
    return () => interval && clearInterval(interval);
  }, [id, isPending]);

  return startPolling;
}
