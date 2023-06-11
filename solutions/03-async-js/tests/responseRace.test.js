const getFirstResponse = require('../responseRace');

describe('getFirstResponse', () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
  ];

  const response1 = { message: 'Response from data1' };
  const response2 = { message: 'Response from data2' };
  const response3 = { message: 'Response from data3' };

  const fetchMock1 = jest.fn(
    (timeInMs) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve(response1),
          });
        }, timeInMs);
      })
  );

  const fetchMock2 = jest.fn(
    (timeInMs) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve(response2),
          });
        }, timeInMs);
      })
  );

  const fetchMock3 = jest.fn(
    (timeInMs) =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve(response3),
          });
        }, timeInMs);
      })
  );

  it('should return response1 as the first URL takes the least time to return a response', async () => {
    global.fetch = jest.fn((url) => {
      if (url === urls[0]) {
        return fetchMock1(200);
      } else if (url === urls[1]) {
        return fetchMock2(300);
      } else if (url === urls[2]) {
        return fetchMock3(400);
      }
    });

    const result = await getFirstResponse(urls);
    expect(result).toEqual(response1);
  });

  it('should return response2 as the second URL takes the least time to return a response', async () => {
    global.fetch = jest.fn((url) => {
      if (url === urls[0]) {
        return fetchMock1(300);
      } else if (url === urls[1]) {
        return fetchMock2(200);
      } else if (url === urls[2]) {
        return fetchMock3(400);
      }
    });

    const result = await getFirstResponse(urls);
    expect(result).toEqual(response2);
  });

  it('should return response3 as the third URL takes the least time to return a response', async () => {
    global.fetch = jest.fn((url) => {
      if (url === urls[0]) {
        return fetchMock1(400);
      } else if (url === urls[1]) {
        return fetchMock2(300);
      } else if (url === urls[2]) {
        return fetchMock3(100);
      }
    });

    const result = await getFirstResponse(urls);
    expect(result).toEqual(response3);
  });

  it('should throw an error if no response is received from any URL', async () => {
    const urls = [
      'https://api.example.com/data1',
      'https://api.example.com/data2',
      'https://api.example.com/data3',
    ];

    const fetchMock = jest.fn(() => Promise.resolve({ ok: false }));

    global.fetch = fetchMock;

    await expect(getFirstResponse(urls)).rejects.toThrow(
      'No response received from any URL'
    );
    expect(fetchMock).toHaveBeenCalledTimes(urls.length);
  });
});
