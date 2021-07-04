var javaCode = `public class Main {
    public static void main(String [] args) {
        System.out.print("Hello World");
    }
}`;

var pythonCode = `print('Hello World' , end=" ");`

var javaScriptCode = `console.log('Hello World');`

var cCode = `#include<stdio.h>

int main(int argc, char *argv[]) {
    printf("Hello World");
    return 0;
}`

var cppCode = `#include<iostream>
using namespace std ;

int main(int argc, char *argv[]) {
    cout<<"Hello World";
    return 0;
}`

export default javaCode ;
export {pythonCode as py , javaScriptCode as js , cCode as c , cppCode as cpp} ;