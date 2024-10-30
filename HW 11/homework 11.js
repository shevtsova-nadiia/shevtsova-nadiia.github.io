// Task 1
/*
Write a function named countPalindrome() which takes a string and returns 
the number of  palindrome words.
Note: A palindrome word is a word that reads the same forwards and 
backwards. Example: level, radar, deed, refer.
Examples:
countPalindrome("Mom and Dad" )  -> 2
countPalindrome("See you at noon")  -> 1
countPalindrome("Kayak races attracts racecar drivers")  -> 2
countPalindrome("")  -> 0
countPalindrome("No palindrome here")  -> 0
*/

function countPalindrome(str) {
    let count = 0;
    str.toLowerCase().split(' ').forEach(el => {
        if(el && el == el.split('').reverse().join('')){
            count++
        }
    });
    return count
}

console.log(countPalindrome("Mom and Dad" ));//  -> 2
console.log(countPalindrome("See you at noon"));//  -> 1
console.log(countPalindrome("Kayak races attracts racecar drivers"));//  -> 2
console.log(countPalindrome(""));//  -> 0
console.log(countPalindrome("No palindrome here"));//  -> 0

// Task 2
/*
Write a function named sum() which takes an array of numbers and a boolean 
value as arguments. It will return the sum of the numbers positioned at even 
indexes if true. And, return sum of numbers positioned at odd indexes if false.
Examples:
sum([1, 5, 10], true)  -> 11
sum([3, 7, 2, 5, 10], false)  -> 12
sum([-1, 1, -2, 2], true)  -> -3
sum([0, -1, 15, 1], false)  -> 0
sum([1, 2, 3, 4, -4], true)  -> 0
*/

function sum(arr, boolean) {
    let sum = 0;
    // 1 way
    // if (boolean){
    //     for (let i = 0; i < arr.length; i+=2) {
    //         sum += arr[i]      
    //     }
    // }else{
    //     for (let i = 1; i < arr.length; i+=2) {
    //         sum += arr[i] 
    //     }
    // }

    // 2 way
    for (let i = 0; i < arr.length; i++) {
        if (boolean && i % 2 === 0){
            sum += arr[i]
        }else if (!boolean && i % 2 !== 0) {
            sum += arr[i]
        }        
    }
    return sum
}

console.log(sum([1, 5, 10], true));//  -> 11
console.log(sum([3, 7, 2, 5, 10], false));//  -> 12
console.log(sum([-1, 1, -2, 2], true));//  -> -3
console.log(sum([0, -1, 15, 1], false));//  -> 0
console.log(sum([1, 2, 3, 4, -4], true));//  -> 0

// Task 3
/*
Write a function named nthChars() which takes a string and a number as 
arguments and returns the string back with every nth characters. 
Examples:
nthChars("Java", 2)  -> "aa"
nthChars("JavaScript", 5)   -> "St"
nthChars("Java", 3)   -> "v"
nthChars("Hi", 4)   -> ""
nthChars("0123456789", 2)  -> "13579"
*/

function nthChars(str, num) {
    let result = [];
    const arr = str.split('')
    for (let i = num-1; i < arr.length; i+=num) {
        result.push(arr[i]) 
    }
    return result.join('') 
}

console.log(nthChars("Java", 2));//  -> "aa"
console.log(nthChars("JavaScript", 5));//   -> "St"
console.log(nthChars("Java", 3));//   -> "v"
console.log(nthChars("Hi", 4));//   -> ""
console.log(nthChars("0123456789", 2));//  -> "13579"

// Task 4
/*
Write a function named canFormString() which takes two string arguments 
and returns true if the second string can be formed by rearranging the 
characters of first string. Return false otherwise.
NOTE: This method is case-insensitive and ignore the white spaces.
Examples:
canFormString("Hello", "Hi")   -> false
canFormString("programming", "gaming")   -> true
canFormString("halogen", "hello")   -> false
canFormString("CONVERSATION", "voices rant on")   -> true
canFormString("12", "123")  -> false
*/

function canFormString(str1, str2) {
    const arr1 = str1.toLowerCase().replace(/\s+/g, '').split('')
    const arr2 = str2.toLowerCase().replace(/\s+/g, '').split('')
    if (arr1.length < arr2.length) {
        return false;
    }
    const elCount = {};
    arr1.forEach(el => {
        elCount[el] = (elCount[el] || 0) + 1;
    });
    let result = true;
    arr2.forEach(el => {
        if (!elCount[el]) {
            result = false
        } else {
            elCount[el]--
        }
    });
    return result
}

console.log(canFormString("Hello", "Hi"));//   -> false
console.log(canFormString("programming", "gaming"));//   -> true
console.log(canFormString("halogen", "hello"));//   -> false
console.log(canFormString("CONVERSATION", "voices rant on"));//   -> true
console.log(canFormString("12", "123"));//  -> false

// Task 5
/*
Write a function named isAnagram() which takes two string arguments and 
returns true if the given strings are anagram. Return false otherwise.
NOTE: An anagram is a word or phrase formed by rearranging the letters of 
another word or phrase. In the context of strings, checking if two strings are 
anagrams of each other means verifying if they contain the same characters in 
the same quantities, regardless of the order of those characters.
NOTE: This method is case-insensitive and ignore the white spaces.
Examples:
isAnagram("Apple", "Peach")   -> false
isAnagram("listen", "silent")   -> true
isAnagram("astronomer", "moon starer")   -> true
isAnagram("CINEMA", "iceman")   -> true
isAnagram("123", "1234")  -> false
*/
function isAnagram(str1, str2) {
    const str1New = str1.toLowerCase().replace(/\s+/g, '').split('').sort().join('')
    const str2New = str2.toLowerCase().replace(/\s+/g, '').split('').sort().join('')
    return str1New === str2New   
}
console.log(isAnagram("Apple", "Peach"));//   -> false
console.log(isAnagram("listen", "silent"));//   -> true
console.log(isAnagram("astronomer", "moon starer"));//   -> true
console.log(isAnagram("CINEMA", "iceman"));//   -> true
console.log(isAnagram("123", "1234"));//  -> false

// Task 6
/*
Write a function named count() which takes an array of numbers and a 
boolean value as arguments. It will return the total count of the even numbers if 
the boolean value is true. And return the total count of the odd numbers if the 
boolean value is false. 
Examples:
count([1, 5, 10], true)  -> 1
count([3, 7, 2, 5, 10], false)  -> 3
count([-1, 1, -2, 2], true)  -> 2
count([0, -1, 15, 1], false)  -> 3
count([1, 2, 3, 4, -4], true)  -> 3
*/

function count(arr, boolean) {
    let countEl = 0;
    for (let i = 0; i < arr.length; i++) {
        if (boolean && arr[i] % 2 === 0){
            countEl++
        }else if (!boolean && arr[i] % 2 !== 0) {
            countEl++
        }        
    }
    return countEl
}

console.log(count([1, 5, 10], true));//  -> 1
console.log(count([3, 7, 2, 5, 10], false));//  -> 3
console.log(count([-1, 1, -2, 2], true));//  -> 2
console.log(count([0, -1, 15, 1], false));//  -> 3
console.log(count([1, 2, 3, 4, -4], true));//  -> 3

// Task 7
/*
Write a function named sumDigitsDouble() which takes a string and returns 
the sum of the digits in the given String multiplied by 2. Return -1 if the given 
string does not have any digits. Ignore negative numbers.
Examples:
sumDigitsDouble("Javascript")  -> -1
sumDigitsDouble("23abc45")   -> 28
sumDigitsDouble("Hi-23")  -> 10
sumDigitsDouble("ab12")  -> 6
sumDigitsDouble("n0numh3r3")  -> 12
*/

function sumDigitsDouble(str) {
    let sum = 0;
    const arr = str.split('') 
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= '0' && arr[i] <= '9'){
            sum += Number(arr[i])
        }
    } 
    return !sum? -1: sum*2
}

console.log(sumDigitsDouble("Javascript"));//  -> -1
console.log(sumDigitsDouble("23abc45"));//   -> 28
console.log(sumDigitsDouble("Hi-23"));//  -> 10
console.log(sumDigitsDouble("ab12"));//  -> 6
console.log(sumDigitsDouble("n0numh3r3"));//  -> 12

// Task 8
/*
Write a function named countOccurrence() which takes two string arguments 
and returns how many times that the first string can form the second string.
Examples:
countOccurrence("Javascript", "Java")  -> 1
countOccurrence("Hello", "World")  -> 0
countOccurrence("Can I can a can", "anc")   -> 3
countOccurrence("Hello", "l")   -> 2
countOccurrence("IT conversations", "IT")   -> 2
*/

function countOccurrence(str1, str2) {
    const elCount1 = {};
    const elCount2 = {};
    let totalCount = Number;
    const arr1 = str1.toLowerCase().replace(/\s+/g, '').split('')
    const arr2 = str2.toLowerCase().replace(/\s+/g, '').split('')
    arr1.forEach(el => {
        elCount1[el] = (elCount1[el] || 0) + 1;
    });
    arr2.forEach(el => {
        elCount2[el] = (elCount2[el] || 0) + 1;
    });
    for (const el in elCount2) {
        if (!elCount1[el]) {
            return 0; 
        }
        const possibleCount = elCount1[el] / elCount2[el];
        totalCount = totalCount < possibleCount ? totalCount : possibleCount;
    }
    return Math.floor(totalCount);
}

console.log(countOccurrence("Javascript", "Java"));//  -> 1
console.log(countOccurrence("Hello", "World"));//  -> 0
console.log(countOccurrence("Can I can a can", "anc"));//   -> 3
console.log(countOccurrence("Hello", "l"));//   -> 2
console.log(countOccurrence("IT conversations", "IT"));//   -> 2