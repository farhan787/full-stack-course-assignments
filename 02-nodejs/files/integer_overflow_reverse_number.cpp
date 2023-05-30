#include <iostream>

using std::cin;
using std::cout;
using std::endl;

int reverse(int x) {
    int num = 0;

    while (x) {
        cout << "x: " << x << ", num: " << num << endl;
        if (num > INT_MAX / 10 || num < INT_MIN / 10)
            return 0;
        num = num * 10 + x % 10;
        x /= 10;
    }
    cout << "x: " << x << ", num: " << num << endl;

    return num;
}

void checking(int x) {
    if (x) {
        cout << "first: ";
        cout << x << endl;
    }

    if (x > 0) {
        cout << "second: ";
        cout << x << endl;
    }
}

int main() {
    // checking(-123);

    // cout << reverse(-123) << endl;
    // cout << reverse(234) << endl;
    cout << reverse(-21438474120) << endl;
}
