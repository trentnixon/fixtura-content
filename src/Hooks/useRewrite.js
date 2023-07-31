import { useState, useEffect } from "react";
import { fetcher } from "@/utils/fetcher";

// Utils
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  


 // HOOKS
 
 // Create a new Article
export function useRewrite(id) {
  const [rewriteStatus, setRewriteStatus] = useState(null);

  async function requestRewrite(ID) {
    const response = await fetcher({
      PATH: `gtp-3-report/rewrite/${ID}`,
    });
    console.log(response.data.istrue)
    if (response.data.istrue) {
      setRewriteStatus(true);
    } else {
      setRewriteStatus(false);
    }
  }

  useEffect(() => {
    setRewriteStatus(null);
  }, [id]);

  return [rewriteStatus, requestRewrite];
}

// Poll Strapi for the new Article
export function usePollRewrite(id, isPending) {
  const [startPolling, setStartPolling] = useState(null);

  useEffect(() => {
    let interval;
    console.log('isPending ', isPending)
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



