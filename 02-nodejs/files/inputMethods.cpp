#include <iostream>
using namespace std;

int main () {
    string s1, s2;
    
    cin >> s1;
    cout << s1 << endl;
 
    cin.ignore();   // to ignore the \n in buffer by cin

    getline(cin, s2);
    cout << s2 << endl;
}