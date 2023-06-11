/**
 * Implement a function `fetchData`, which is responsible for fetching data from a specified URL using the Fetch API in JavaScript. 
 * Your goal is to handle both successful and failed responses gracefully.

  The fetchData function should have the following behavior:
  - Accept a single parameter url which represents the URL from which to fetch the data.
  - If the response is not successful (status code other than 2xx), throw an Error with a descriptive message indicating the failure (e.g., "Failed to fetch data (404)").
  - If the response is successful, parse the response body as JSON using the json() method.

  Once you've implemented the logic, test your code by running
  - `npm run test-fetchApiData`
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data (${response.status})`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

module.exports = fetchData;
