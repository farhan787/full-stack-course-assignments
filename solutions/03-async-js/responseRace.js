/**
 * Implement a function `getFirstResponse` that retrieves the response from the URL that first returns a response among a list of URLs. 
 * The function utilizes promises and async/await syntax for handling asynchronous operations. Here's a description of the function:

  - The function expects an input parameter urls, which should be an array of URLs.
  - If an error occurs during the fetching or parsing of the response, the function throws an Error object with the message 'No response received from any URL'.

  Once you've implemented the logic, test your code by running
    - `npm run test-responseRace`
 */
async function getFirstResponse(urls) {
  const requests = urls.map((url) => fetch(url));

  try {
    const response = await Promise.race(requests);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('No response received from any URL');
  }
}

module.exports = getFirstResponse;
