/**
 * Implement a function `fetchSimultaneously`, which is responsible for fetching data from multiple URLs simultaneously 
 * using the Fetch API in JavaScript. The function should handle both successful and failed responses and return the responses
 * in the same order as the input URLs.

  The fetchSimultaneously function should have the following behavior:
  - If the response is not successful (status code other than 2xx), throw an Error with a descriptive message indicating the failure (e.g., "Failed to fetch data from <URL> (404)").
  - If an error occurs during the fetch operation, catch the error and return an object with an error property containing the error message.
  - The order of the responses in the returned array must be same as the order of the input URLs.

  Once you've implemented the logic, test your code by running
  - `npm run test-fetchSimultaneously`
 */
async function fetchSimultaneously(urls) {
  const promises = urls.map((url) =>
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from ${url} (${response.status})`
          );
        }
        return response.json();
      })
      .catch((error) => ({ error: error.message }))
  );

  const responses = await Promise.all(promises);
  return responses;
}

module.exports = fetchSimultaneously;
