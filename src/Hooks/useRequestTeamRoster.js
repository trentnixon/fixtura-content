import { useState, useEffect } from "react";
import { fetcher } from "@/utils/fetcher";

export function useRequestTeamRoster() {
  const [requestStatus, setRequestStatus] = useState(null);
  const [error, setError] = useState(null);

  const requestTeamRoster = async (renderId) => {
    setRequestStatus("pending");
    setError(null);

    try {
      const response = await fetcher({
        PATH: `render/RequestTeamRoster`,
        method: "POST",
        body: { ID: renderId },
      });

      // Check if the job was added successfully or if an error message was returned
      if (response.data?.status === "Job added successfully") {
        setRequestStatus("success");
      } else {
        setError(response.data?.message || "An unknown error occurred");
        setRequestStatus("fail");
      }
    } catch (error) {
      setError(error.message);
      setRequestStatus("error");
    }
  };

  // Reset the status when needed, for example, if the user navigates away
  useEffect(() => {
    return () => {
      setRequestStatus(null);
      setError(null);
    };
  }, []);

  return { requestStatus, error, requestTeamRoster };
}
