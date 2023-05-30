function findDuplicateTransactions(transactions) {
  const duplicates = [];

  for (let i = 0; i < transactions.length - 1; i++) {
    const transactionA = transactions[i];

    for (let j = i + 1; j < transactions.length; j++) {
      const transactionB = transactions[j];

      if (areTransactionsDuplicate(transactionA, transactionB)) {
        duplicates.push(transactionB);
      }
    }
  }

  return duplicates;
}

function areTransactionsDuplicate(transactionA, transactionB) {
  const fieldsToCompare = ['price', 'category', 'itemName'];
  for (const field of fieldsToCompare) {
    if (transactionA[field] !== transactionB[field]) {
      return false;
    }
  }

  const timeDifference = Math.abs(
    transactionA.timestamp - transactionB.timestamp
  );

  return timeDifference <= 60000;
}

module.exports = findDuplicateTransactions;
