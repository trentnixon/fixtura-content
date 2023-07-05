 export const fetcher = async ({ PATH, method = "GET", body = {}, retry = false, nextConfig={} }) => {
  
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIXTURA_TOKEN}`,
      },
      body: (method === "POST" || method === "PUT") ? JSON.stringify(body) : null,
      ...nextConfig // spread the nextConfig object into options
    };
  
    //console.log(options)
    try {
      console.log(`Fetching data from ${process.env.NEXT_PUBLIC_FIXTURA_API}${PATH}`);
      const response = await fetch(`${process.env.NEXT_PUBLIC_FIXTURA_API}${PATH}`, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log(`Data fetched successfully from ${PATH}`);
      return await response.json();
    } catch (error) {
      console.log(`Error in fetcher: ${error}`);
  
      if (retry) {
        console.log("Retrying fetcher in 2 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return fetcher({ PATH, method, body, retry: false, nextConfig }); // Retry without allowing more retries
      } else {
        throw error; // it's usually better to throw the error instead of returning false, so you can handle it in the component
      }
    }
  }