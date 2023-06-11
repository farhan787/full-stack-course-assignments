/**
 Write a function called `processNums` that takes an array of numbers as input.
  The function should use promise chaining to perform the following operations in **order**:
    - Multiply each number in the array by 2.
    - Filter out any numbers that are less than 10.
    - Square each remaining number.
    - Calculate the sum of all the squared numbers.
    - The function should return a promise that resolves with the final sum.

    Once you've implemented the logic, test your code by running
    - `npm run test-processNums`
 */
function processNums(numbers) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(numbers)) {
      reject(new Error('Input must be an array of numbers'));
    } else {
      resolve(numbers);
    }
  })
    .then((numbers) => {
      const multipliedNumbers = numbers.map((number) => number * 2);
      return multipliedNumbers;
    })
    .then((multipliedNumbers) => {
      const filteredNumbers = multipliedNumbers.filter(
        (number) => number >= 10
      );
      return filteredNumbers;
    })
    .then((filteredNumbers) => {
      const squaredNumbers = filteredNumbers.map((number) => number ** 2);
      return squaredNumbers;
    })
    .then((squaredNumbers) => {
      const sum = squaredNumbers.reduce((acc, curr) => acc + curr, 0);
      return sum;
    });
}

module.exports = processNums;
