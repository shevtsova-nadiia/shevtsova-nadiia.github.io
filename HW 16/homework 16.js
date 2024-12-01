// Task 1
/*
Write a function named toInitials() which takes a string argument 
considered to be full name and returns initials of the given full name.
NOTE: Initials should be separated with a space and followed with a period.
Assume you will always be given first name and last name only. 
Examples
toInitials( "Joe Doe")  -> "J. D."
toInitials( "Alex Reyes")  -> "A. R."
toInitials( "Tom Cruise")  -> "T. C."
toInitials( "Bruce Willis")  -> "B. W."
toInitials( "Ja Le")  -> "J. L."
*/

function toInitials(str) {
    return str.split(' ').map(el => el[0]+'.').join(' ')
}

console.log(toInitials( "Joe Doe"));//  -> "J. D."
console.log(toInitials( "Alex Reyes"));//  -> "A. R."
console.log(toInitials( "Tom Cruise"));//  -> "T. C."
console.log(toInitials( "Bruce Willis"));//  -> "B. W."
console.log(toInitials( "Ja Le"));//  -> "J. L."

// Task 2
/*
Write a function named hasNumbers() which takes a string argument and 
returns true if there is a number and false if there isn’t. 
Examples:
hasNumbers("")  -> false
hasNumbers("John is 34 years old")  -> true
hasNumbers("Hello 3")  -> true
hasNumbers("125$")  -> true
hasNumbers("   a   ")  -> false
hasNumbers("      ")  -> false
hasNumbers("!@#$%^&*()_+")  -> false
*/

function hasNumbers(str) {
    return str.replace(/\D/g, '') > 0

    // 2 way
    return str.replace(/\D/g, '').length > 0
}


console.log(hasNumbers(""));//  -> false
console.log(hasNumbers("John is 34 years old"));//  -> true
console.log(hasNumbers("Hello 3"));//  -> true
console.log(hasNumbers("125$"));//  -> true
console.log(hasNumbers("   a   "));//  -> false
console.log(hasNumbers("      "));//  -> false
console.log(hasNumbers("!@#$%^&*()_+"));//  -> false

// Task 3
/*
Write a function named elementLength() which takes an array argument 
and returns the length of each element as a separate array.
Examples:
elementLength( [ "Hello", "World" ] )  -> [ 5, 5 ]
elementLength( [ "Apple", "Banana", "Orange", "Pear" ] )  -> [ 5, 6, 6, 4 ]
elementLength( ["BMW", "Mercedes", "Audi" ] )  -> [ 3, 8, 4 ]
elementLength( [ ] )  -> [ ]
elementLength( [ "Trampoline", "", "Tennis", "Basketball" ] )  -> [ 10, 0, 6, 10 ]
*/

function elementLength(arr) {
    const arrNew = arr.map(el => el.length)
    return arrNew

    // 2 way
    return arr.map(el => el.length)
}

console.log(elementLength( [ "Hello", "World" ] ));// -> [ 5, 5 ]
console.log(elementLength( [ "Apple", "Banana", "Orange", "Pear" ] ));//  -> [ 5, 6, 6, 4 ]
console.log(elementLength( ["BMW", "Mercedes", "Audi" ] ));//  -> [ 3, 8, 4 ]
console.log(elementLength( [ ] ));//  -> [ ]
console.log(elementLength( [ "Trampoline", "", "Tennis", "Basketball" ] ));//  -> [ 10, 0, 6, 10 ]

// Task 4
/*
Write a function named isArraySumEvenOrOdd() which takes an array of 
numbers and calculates if the sum of its elements is even or odd.
Note: If the array is empty return even.
Examples:
isArraySumEvenOrOdd( [ ] )  -> "even"
isArraySumEvenOrOdd( [ 0,-1,-5 ] )      -> "even"
isArraySumEvenOrOdd( [ 7,1, 8,1 ] )     ->  "odd”
isArraySumEvenOrOdd( [ 0,0 ] )  ->  "even"
isArraySumEvenOrOdd( [ 1,1,1,1,1 ] )   ->  "odd”
*/

function isArraySumEvenOrOdd(arr) {
    let a = arr.reduce((total, el) => total + el, 0)
    return ((a % 2) === 0)? 'even' : 'odd'

    // 2 way
    return ((arr.reduce((total, el) => total + el, 0) % 2) === 0)? 'even' : 'odd'
}

console.log(isArraySumEvenOrOdd( [ ] ));//  -> "even"
console.log(isArraySumEvenOrOdd( [ 0,-1,-5 ] ));//      -> "even"
console.log(isArraySumEvenOrOdd( [ 7,1, 8,1 ] ));//     ->  "odd”
console.log(isArraySumEvenOrOdd( [ 0,0 ] ));//  ->  "even"
console.log(isArraySumEvenOrOdd( [ 1,1,1,1,1 ] ));//   ->  "odd”

// Task 5
/*
Write a function named reverse() which takes a string argument 
and returns the given string reversed. 
Examples:
reverse("Hello World")  -> "dlroW olleH"
reverse("TechGlobal")  -> "labolGhceT"
reverse("Basketball is fun")  -> "nuf si llabteksaB"
reverse("")  -> ""
reverse("Apples 456")  -> "654 selppA"
*/

function reverse(str) {
    return str.split('').reverse().join('')   
}

console.log(reverse("Hello World"));//  -> "dlroW olleH"
console.log(reverse("TechGlobal"));//  -> "labolGhceT"
console.log(reverse("Basketball is fun"));//  -> "nuf si llabteksaB"
console.log(reverse(""));//  -> ""
console.log(reverse("Apples 456"));//  -> "654 selppA"

// Task 6
/*
Write a function named reverseWords() which takes a string argument 
and returns a string with each word within that string reversed 
but still in the same order as the initial string. 
Examples:
reverseWords("Hello World")  -> "olleH dlroW"
reverseWords("TechGlobal")  -> "labolGhceT"
reverseWords("Basketball is fun")  -> "llabteksaB si nuf"
reverseWords("")  -> "”
reverseWords("Apples 456")  -> "selppA 654"
*/

function reverseWords(str) {
    return str.split(' ').map(el => el.split('').reverse().join(''));
}

console.log(reverseWords("Hello World"));//  -> "olleH dlroW"
console.log(reverseWords("TechGlobal"));//  -> "labolGhceT"
console.log(reverseWords("Basketball is fun"));//  -> "llabteksaB si nuf"
console.log(reverseWords(""));//  -> "”
console.log(reverseWords("Apples 456"));//  -> "selppA 654"