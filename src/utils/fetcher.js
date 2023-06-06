import axios from 'axios';

export const fetcher = async (PATH, method = "GET", body = {}, retry = false) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_FIXTURA_TOKEN}`,
    },
  };

  if (method === "POST" || method === "PUT") {
    options.data = body;
  }

  try {
    console.log(`Fetching data from ${process.env.NEXT_PUBLIC_FIXTURA_API}${PATH}`);
    const response = await axios(`${process.env.NEXT_PUBLIC_FIXTURA_API}${PATH}`, options);

    console.log(`Data fetched successfully from ${PATH}`);
    return response.data;
  } catch (error) {
    console.log(`Error in fetcher: ${error}`);

    if (retry) {
      console.log("Retrying fetcher in 2 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetcher(PATH, method, body, false); // Retry without allowing more retries
    } else {
      return false;
    }
  }
}