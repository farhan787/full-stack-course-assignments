const getResponses = require('../getAllResponses');

describe('getResponses', () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
  ];

  const response1 = { message: 'Response from data1' };
  const response2 = { message: 'Response from data2' };
  const response3 = { message: 'Response from data3' };

  const fetchMock = jest.fn((url) => {
    if (url === urls[0]) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response1),
      });
    } else if (url === urls[1]) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response2),
      });
    } else if (url === urls[2]) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(response3),
      });
    }
  });

  const failedUrl = 'https://api.example.com/fail';

  const fetchFailMock = jest.fn(() => Promise.resolve({ ok: false }));

  beforeEach(() => {
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return responses for all successful URLs', async () => {
    const result = await getResponses(urls);
    expect(result).toEqual([response1, response2, response3]);
    expect(fetchMock).toHaveBeenCalledTimes(urls.length);
  });

  it('should return an error response for a failed URL', async () => {
    global.fetch = jest.fn((url) => {
      if (url === failedUrl) {
        return fetchFailMock();
      }
      return fetchMock(url);
    });

    const result = await getResponses([...urls, failedUrl]);
    expect(result).toEqual([
      response1,
      response2,
      response3,
      {
        error:
          'Failed to fetch data from https://api.example.com/fail (undefined)',
      },
    ]);
    expect(fetchFailMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(urls.length);
  });

  it('should return an empty array for an empty input URL list', async () => {
    const result = await getResponses([]);
    expect(result).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
