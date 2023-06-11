const processNums = require('../processNums');

describe('processNums', () => {
  it('should process numbers correctly', async () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = await processNums(numbers);
    expect(result).toBe(100);
  });

  it('should process negative numbers correctly', async () => {
    const numbers = [-2, -4, 6, 8, 10];
    const result = await processNums(numbers);
    expect(result).toBe(800);
  });

  it('should return 0 when the input array is empty', async () => {
    const numbers = [];
    const result = await processNums(numbers);
    expect(result).toBe(0);
  });

  it('should reject the promise when the input is not an array', async () => {
    const numbers = 'not an array';
    await expect(processNums(numbers)).rejects.toThrow(
      'Input must be an array of numbers'
    );
  });

  it('should process decimal numbers correctly', async () => {
    const numbers = [1.5, 2.2, 3.7, 4.1, 5.9];
    const result = await processNums(numbers);
    expect(result).toBeCloseTo(139.24);
  });

  it('should process large numbers correctly', async () => {
    const numbers = [1000000, 2000000, 3000000];
    const result = await processNums(numbers);
    expect(result).toBe(56000000000000);
  });

  it('should process an array of a single number correctly', async () => {
    const numbers = [5];
    const result = await processNums(numbers);
    expect(result).toBe(100);
  });

  it('should process duplicate numbers correctly', async () => {
    const numbers = [2, 4, 6, 4, 8, 6, 10];
    const result = await processNums(numbers);
    expect(result).toBe(944);
  });
});
