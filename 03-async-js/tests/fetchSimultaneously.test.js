const fetchSimultaneously = require('../fetchSimultaneously');

describe('fetchSimultaneously', () => {
  it('should fetch data from URLs and preserve response order', async () => {
    const urls = [
      'https://api.example.com/data/1',
      'https://api.example.com/data/2',
      'https://api.example.com/data/3',
    ];

    global.fetch = jest.fn().mockImplementation((url) => {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ url }),
      });
    });

    const expectedResponses = [
      { url: 'https://api.example.com/data/1' },
      { url: 'https://api.example.com/data/2' },
      { url: 'https://api.example.com/data/3' },
    ];

    const responses = await fetchSimultaneously(urls);

    expect(responses).toEqual(expectedResponses);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenCalledWith(urls[0]);
    expect(global.fetch).toHaveBeenCalledWith(urls[1]);
    expect(global.fetch).toHaveBeenCalledWith(urls[2]);
  });

  it('should handle errors and preserve response order', async () => {
    const urls = [
      'https://api.example.com/data/1',
      'https://api.example.com/data/2',
      'https://api.example.com/data/3',
    ];

    global.fetch = jest.fn().mockImplementation((url) => {
      return Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });
    });

    const expectedResponses = [
      {
        error: 'Failed to fetch data from https://api.example.com/data/1 (500)',
      },
      {
        error: 'Failed to fetch data from https://api.example.com/data/2 (500)',
      },
      {
        error: 'Failed to fetch data from https://api.example.com/data/3 (500)',
      },
    ];

    const responses = await fetchSimultaneously(urls);

    expect(responses).toEqual(expectedResponses);
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenCalledWith(urls[0]);
    expect(global.fetch).toHaveBeenCalledWith(urls[1]);
    expect(global.fetch).toHaveBeenCalledWith(urls[2]);
  });
});
