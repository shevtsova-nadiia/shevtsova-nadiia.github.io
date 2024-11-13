// Task 1
/*
Write a function named countVC() which takes a string argument and returns 
an object with the count of vowels and consonants.
Examples:
countVC("Hello")               -> {vowels: 2, consonants: 3}
countVC("Programming")   -> {vowels: 3, consonants: 8}
countVC("123AbC")               -> {vowels: 1, consonants: 2}
countVC("123!@#xyz")             -> {vowels: 0, consonants: 3}
countVC("")                           -> {vowels: 0, consonants: 0}
*/

function countVC(str) {
    let arr = str.toLowerCase().split('')
    let a = 0;
    let b = 0;
    arr.forEach(i => {
        if (/[a-z]/.test(i)) {
            if (['a','e','o','u','i'].includes(i)) {
                a += 1
            }else{
                b += 1
        }
    }});
    return {vowels: a, consonants: b}
}

console.log(countVC("Hello"));//               -> {vowels: 2, consonants: 3}
console.log(countVC("Programming"));//   -> {vowels: 3, consonants: 8}
console.log(countVC("123AbC"));//               -> {vowels: 1, consonants: 2}
console.log(countVC("123!@#xyz"));//             -> {vowels: 0, consonants: 3}
console.log(countVC(""));//                           -> {vowels: 0, consonants: 0}

//Task 2
/*
Write a function named countChars() which takes a string argument and 
returns an object with the count of letters, numbers, and specials.
NOTE: If the count of a category is 0 then it should not be in the object. Also 
spaces do not count towards any category
Examples:
countChars("Hello")                           -> {letters: 5}
countChars("Programming 123")   -> {letters: 11, numbers: 3}
countChars("123AbC!@#")               -> {letters: 3, numbers: 3, specials: 3}
countChars("0987654321")               -> {numbers: 10}
countChars("     ")                                  -> {}
countChars("")                                       -> {}
*/

function countChars(str) {
    let arr = str.toLowerCase().trim().split('')
    let counts = {
        letters: 0,
        numbers: 0,
        specials: 0
    };
    arr.forEach(i => {
        if (/[a-z]/.test(i)) {
            counts.letters += 1
        }else if (/\d/.test(i)) {
            counts.numbers += 1
        }else if (/[^a-z0-9\s]/.test(i)) {
            counts.specials += 1
        }
    });
    for (let key in counts) {
        if (counts[key] === 0) {
            delete counts[key];
        }
    }
    return counts  
}

console.log(countChars("Hello"));//                           -> {letters: 5}
console.log(countChars("Programming 123"));//   -> {letters: 11, numbers: 3}
console.log(countChars("123AbC!@#"));//               -> {letters: 3, numbers: 3, specials: 3}
console.log(countChars("0987654321"));//               -> {numbers: 10}
console.log(countChars("     "));//                                  -> {}
console.log(countChars(""));//                                       -> {}

//Task 3
/*
Write a function named maxOccurrences() which takes a string argument and 
returns the character that appears the most number of times in the string.
NOTE: If there is a tie, return the first one that appears in the string. This task is 
case sensitive. Ignore spaces. If the string is empty or consist of spaces only, 
then return an empty string.
Examples:
maxOccurrences("Hello")             -> "l"
maxOccurrences("Occurrences")  -> "c"
maxOccurrences("    ab    ")      -> "al"
maxOccurrences("12   3   21")    -> "1"
maxOccurrences("      ")      -> ""
maxOccurrences("")    -> ""
*/

function maxOccurrences(str) {
    if (!str.trim()) return "";

    let maxChar = '';
    let maxCount = 0;
    let counts = {};

    for (let char of str) {
        if (char === ' ') continue;
        counts[char] = (counts[char] || 0) + 1;
        
        if (counts[char] > maxCount) {
            maxCount = counts[char];
            maxChar = char;
        }
    }
    return maxChar;
}

console.log(maxOccurrences("Hello"));//             -> "l"
console.log(maxOccurrences("Occurrences"));//  -> "c"
console.log(maxOccurrences("    ab    "));//      -> "al"
console.log(maxOccurrences("12   3   21"));//    -> "1"
console.log(maxOccurrences("      "));//      -> ""
console.log(maxOccurrences(""));//    -> ""

//Task 4
/*
Write a function named starOut() which takes a string argument and returns it 
back with every star removed as well as the right and left of the star.
NOTE: If there are 2 stars next to each other than remove the next non star
So "ab*cd" yields "ad" and "ab**cd" also yields "ad".
Examples:
starOut("ab*cd")  -> "ad"
starOut("ab**cd")  -> "ad"
starOut("xm*sm*sy")  -> "xy"
starOut("abc")     -> "abc"
starOut("***")    -> ""
starOut("   ")      -> "   "
starOut("")    -> ""
*/

function starOut(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '*') {
            if (i > 0) {
                result = result.slice(0, result.length - 1);
                //result = result.slice(0, i - 1);
            }
            i++;
            continue;
        } else {
            result += str[i];
        }
    }
    return result;
}
console.log(starOut("ab*cd"));//  -> "ad"
console.log(starOut("ab**cd"));//  -> "ad"
console.log(starOut("xm*sm*sy"));//  -> "xy"
console.log(starOut("abc"));//     -> "abc"
console.log(starOut("***"));//    -> ""
console.log(starOut("   "));//      -> "   "
console.log(starOut(""));//    -> ""

//Task 5
/*
Write a function named romanToInt() which takes a string roman numeral as 
its arguments and return the roman numeral converted to the number. A roman 
numeral is a set of symbols that add up to a number. CXII -> 100+10+1+1 -> 
112
NOTE: 
Symbol       Value
I                  1
V                 5
X                10
L                 50
C                100
D                500
M               1000
Examples:
romanToInt("I")  -> 1
romanToInt("IV")  -> 4
romanToInt("CXII")  -> 112
romanToInt("MMM")  -> 3000
romanToInt("MMMDCCCLXXXVIII")   -> 3888
romanToInt("MDCLXVI")    -> 1666
*/

function romanToInt(str) {
    const roman = {I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;

    for (let i = 0; i < str.length; i++) {
        const current = roman[str[i]];
        const next = roman[str[i + 1]];
        current < next ? total += -current : total += current
    }
    return total;
}

console.log(romanToInt("I"));//  -> 1
console.log(romanToInt("IV"));//  -> 4
console.log(romanToInt("CXII"));//  -> 112
console.log(romanToInt("MMM"));//  -> 3000
console.log(romanToInt("MMMDCCCLXXXVIII"));//   -> 3888
console.log(romanToInt("MDCLXVI"));//    -> 1666