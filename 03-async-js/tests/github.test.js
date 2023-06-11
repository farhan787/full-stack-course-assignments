const GithubHelper = require('../github');

describe('GithubHelper', () => {
  let githubHelper;

  beforeAll(() => {
    githubHelper = new GithubHelper();
  });

  describe('getAccountByEmail', () => {
    it('should return the account object when a matching email is found', async () => {
      const email = 'hkirat@gmail.com';
      const result = await githubHelper.getAccountByEmail(email);
      expect(result.success).toBe(true);
      expect(result.account.email).toBe(email);
      expect(result.errMsg).toBe('');
    });

    it('should return an error message when no account is found with the given email', async () => {
      const email = 'nonexistent@gmail.com';
      const result = await githubHelper.getAccountByEmail(email);
      expect(result.success).toBe(false);
      expect(result.account).toBe(null);
      expect(result.errMsg).toBe('No account found with this email');
    });
  });

  describe('getAccountByUsername', () => {
    it('should return the account object when a matching username is found', async () => {
      const username = 'hkirat';
      const result = await githubHelper.getAccountByUsername(username);
      expect(result.success).toBe(true);
      expect(result.account.username).toBe(username);
      expect(result.errMsg).toBe('');
    });

    it('should return an error message when no account is found with the given username', async () => {
      const username = 'nonexistent';
      const result = await githubHelper.getAccountByUsername(username);
      expect(result.success).toBe(false);
      expect(result.account).toBe(null);
      expect(result.errMsg).toBe('No account found with this username');
    });
  });
});
