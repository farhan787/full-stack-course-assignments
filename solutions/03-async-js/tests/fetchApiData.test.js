const fetchData = require('../fetchApiData');

describe('fetchData', () => {
  it('should fetch data from the API', async () => {
    const url = 'https://api.example.com/data';
    const data = { message: 'Hello, World!' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(data),
    });

    const result = await fetchData(url);

    expect(result).toEqual(data);
    expect(global.fetch).toHaveBeenCalledWith(url);
  });

  it('should throw an error when failed to fetch data', async () => {
    const url = 'https://api.example.com/data';

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchData(url)).rejects.toThrow('Failed to fetch data (404)');
    expect(global.fetch).toHaveBeenCalledWith(url);
  });

  it('should throw an error when an error occurs during fetching', async () => {
    const url = 'https://api.example.com/data';

    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await expect(fetchData(url)).rejects.toThrow(
      'Failed to fetch data: Network error'
    );
    expect(global.fetch).toHaveBeenCalledWith(url);
  });
});
