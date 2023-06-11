/**
 * TESTING:
 *  Once you've implemented the logic, test your code by running
  - `npm run test-github`
 */

class GithubHelper {
  githubAccounts = [
    {
      username: 'hkirat',
      email: 'hkirat@gmail.com',
      imageUrl: 'https://hkirat-image-url',
      repostiories: [],
      followers: 441,
    },
    {
      username: 'fake_username',
      email: 'fake_email@gmail.com',
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
  getAccountByEmail(userEmail) {
    const account = this.githubAccounts.filter(
      (account) => account.email === userEmail
    );
    return new Promise((resolve, reject) => {
      if (account && account.length) {
        resolve({ success: true, account: account[0], errMsg: '' });
      }
      resolve({
        success: false,
        account: null,
        errMsg: 'No account found with this email',
      });
    }, 1000);
  }

  /**
   * Complete below method which takes username and find the account from above githubAccounts list using username and then returns the account
   * wrapped in a promise having a delay of some milliseconds to mimick the Database or API call. Response body must contain { success, account, errMsg }
   * both in case of success and failure.
   */
  getAccountByUsername(username) {
    const account = this.githubAccounts.filter(
      (account) => account.username === username
    );
    return new Promise((resolve, reject) => {
      if (account && account.length) {
        resolve({ success: true, account: account[0], errMsg: '' });
      }
      resolve({
        success: false,
        account: null,
        errMsg: 'No account found with this username',
      });
    }, 1000);
  }
}

module.exports = GithubHelper;
