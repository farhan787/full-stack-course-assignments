/**
 * Implement a function called `getResponses` that fetches data from multiple URLs concurrently and returns an array of responses 
 * or error messages if failed to fetch the response for any reason.

  - Accept an array of URLs as the urls parameter.
  - If the response is not successful (status code other than 2xx), throw an Error with a descriptive message indicating the failure (e.g., "Failed to fetch data from <URL> (404)").
  - If an error occurs during the fetch operation, catch the error and return an object with an error property containing the error message.
  - The resulting array, responses, will contain objects with a status property indicating the status of each Promise (either "fulfilled" or "rejected") and a value or reason property containing the corresponding response or error message.
  - Map over the responses array and return a new array where fulfilled Promises' values are extracted, and rejected Promises' reasons (error messages) are returned.

  Once you've implemented the logic, test your code by running
  - `npm run test-getAllResponses`
 */
async function getResponses(urls) {}

module.exports = getResponses;
