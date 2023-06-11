/**
 * TESTING:
 *  Once you've implemented the logic, test your code by running
  - `npm run test-github`
 */

class GithubHelper {
  githubAccounts = [
    {
      email: 'hkirat@gmail.com',
      username: 'hkirat',
      imageUrl: 'https://hkirat-image-url',
      repostiories: [],
      followers: 441,
    },
    {
      email: 'fake_email@gmail.com',
      username: 'farhan787',
      imageUrl: 'https://fake-image-url',
      repostiories: [],
      followers: 32,
    },
  ];

  /**
   * Complete below method which takes userEmail and find the account from above githubAccounts list using email and then returns the account
   * wrapped in a promise having a delay of some milliseconds to mimick the Database or API call. Response body must contain { success, account, errMsg }
   * both in case of success and failure.
   */
  getAccountByEmail(userEmail) {}

  /**
   * Complete below method which takes username and find the account from above githubAccounts list using username and then returns the account
   * wrapped in a promise having a delay of some milliseconds to mimick the Database or API call. Response body must contain { success, account, errMsg }
   * both in case of success and failure.
   */
  getAccountByUsername(username) {}
}

module.exports = GithubHelper;
