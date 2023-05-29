function isPalindrome(str) {
  // TODO: add in readme, handle case sensitive characters
  const alphanumericStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let left = 0;
  let right = alphanumericStr.length - 1;

  while (left < right) {
    if (alphanumericStr[left] !== alphanumericStr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

module.exports = isPalindrome;
