const findDuplicateTransactions = require('../duplicate-transactions');

describe('findDuplicateTransactions', () => {
  test('returns an empty array when given an empty input', () => {
    const transactions = [];

    const result = findDuplicateTransactions(transactions);
    expect(result).toEqual([]);
  });

  test('returns an empty array when no duplicate transactions exist', () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
      },
      {
        id: 2,
        timestamp: 1656105600000,
        price: 20,
        category: 'Food',
        itemName: 'Burger',
      },
      {
        id: 3,
        timestamp: 1656134400000,
        price: 15,
        category: 'Clothing',
        itemName: 'T-Shirt',
      },
    ];

    const result = findDuplicateTransactions(transactions);
    expect(result).toEqual([]);
  });

  test('returns the correct duplicate transactions', () => {
    const transactions = [
      {
        id: 1,
        timestamp: 1656076800000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
      },
      {
        id: 2,
        timestamp: 1656076860000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
      },
      {
        id: 3,
        timestamp: 1656105600000,
        price: 25,
        category: 'Clothing',
        itemName: 'T-Shirt',
      },
      {
        id: 4,
        timestamp: 1656105660000,
        price: 25,
        category: 'Clothing',
        itemName: 'T-Shirt',
      },
      {
        id: 5,
        timestamp: 1656134400000,
        price: 30,
        category: 'Electronics',
        itemName: 'Headphones',
      },
      {
        id: 6,
        timestamp: 1657134400000,
        price: 30,
        category: 'Electronics',
        itemName: 'Headphones',
      },
    ];

    const result = findDuplicateTransactions(transactions);
    expect(result).toEqual([
      {
        id: 2,
        timestamp: 1656076860000,
        price: 10,
        category: 'Food',
        itemName: 'Pizza',
      },
      {
        id: 4,
        timestamp: 1656105660000,
        price: 25,
        category: 'Clothing',
        itemName: 'T-Shirt',
      },
    ]);
  });
});
