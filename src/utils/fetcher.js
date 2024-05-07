/**
 * Improved version of the fetcher function with added error handling, code clarity,
 * and recommendations for future improvements.
 */

// Dev notes:
// - Improved readability by structuring options setup outside the try-catch block.
// - Enhanced error handling to provide more context for debugging.
// - Refactored retry logic for clarity and to prevent potential infinite loops.
// - Removed console.logs for cleaner production code; consider using a more sophisticated logging mechanism for debugging.

const getConfig = (isProduction) => {
 
  return {
    api: isProduction ? process.env.NEXT_PUBLIC_FIXTURA_API_PROD : process.env.NEXT_PUBLIC_FIXTURA_API,
    token: isProduction ? process.env.NEXT_PUBLIC_FIXTURA_TOKEN_PROD : process.env.NEXT_PUBLIC_FIXTURA_TOKEN
  };
};

export const fetcher = async ({ 
  PATH,
  method = "GET",
  body = {},
  retry = false,
  nextConfig = {},
}) => {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
  const { api, token } = getConfig(isProduction);
  const endpoint = `${api}${PATH}`;
  const headers = { 
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  
 


  const options = {
    method,
    headers,
    body: method === "POST" || method === "PUT" ? JSON.stringify(body) : null,
    ...nextConfig,
  };

  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      // Attempt to parse the response body for detailed error information
      const errorBody = await response.text(); // Use .json() if the error response is in JSON format
      throw new Error(
        `HTTP error! status: ${response.status} for ${PATH}. Details: ${errorBody}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in fetcher: ${error}`);
    if (retry) {
      console.warn("Retrying fetch once in 2 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetcher({ PATH, method, body, retry: false, nextConfig });
    }
    throw error;
  }
};


// Recommendations for future improvements:
// - Consider parsing JSON error responses if your API consistently returns errors in JSON format.
//   This could provide even clearer insights into the errors.
// - Implement a more nuanced error handling strategy that can distinguish between client-side and server-side errors.
// - Ensure the API endpoints and request formats are correctly documented and implemented to minimize 404 errors.

// LLM notes:
// This function is a generic fetcher utility designed to make HTTP requests.
// It's part of a larger application's utilities/services layer, providing an abstracted way to interact with APIs.
// It supports GET, POST, PUT methods, custom headers through `nextConfig`, and a simple retry mechanism.
// It resides within the utilities folder, usually under `/utils/fetcher.js` or a similar path.
