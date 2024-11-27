
// Task 1
/*
Write a function named toCamelCase() which takes a string as its argument 
and returns a new string in camelCase. Assume the string only contains letters 
and spaces
Examples:
toCamelCase("first name")  ->"firstName"
toCamelCase("last     name")  ->"lastName"
toCamelCase("   ZIP CODE")  ->"zipCode"
toCamelCase(“I Learn Java Script”)    -> "iLearnJavaScript"
toCamelCase(“helloWorld”)     -> “helloWorld”
*/

function toCamelCase(str) {
    const newStr = [];
    arrStr = str.trim().split(' ')
    if (arrStr.length === 1) return str
    for (let i = 0; i < arrStr.length; i++) {
        if (arrStr[i] !== '') {
            if (i === 0) {
                el = arrStr[i].toLowerCase()
                newStr.push(el)
            }else {
                el = arrStr[i][0].toUpperCase() + arrStr[i].slice(1, arrStr[i].length+1)
                newStr.push(el)
            }
        }       
    }
    return newStr.join('')
// or
    return arrStr.map((el, i) => {
        if (i === 0) return el
        return el.charAt(0).toUpperCase() + el.slice(1)
    }).join('')
}

console.log(toCamelCase("first name"));//  ->"firstName"
console.log(toCamelCase("last     name"));//  ->"lastName"
console.log(toCamelCase("   ZIP CODE"));//  ->"zipCode"
console.log(toCamelCase("I Learn Java Script"));//    -> "iLearnJavaScript"
console.log(toCamelCase("helloWorld"));//     -> “helloWorld”

//Task 2
/*
Write a function named toSnakeCase() which takes a string as its argument 
and returns a new string in snake_case. Assume the string only contains letters 
and spaces
NOTE: In snake case words are separated by underscores (_) and are all 
lowercase.
Examples:
toSnakeCase("first name")  ->"first_name"
toSnakeCase("last    name")  ->"last_name"
toSnakeCase("    I love Java Script")  ->"i_love_java_script"
toSnakeCase("already_snake_case")   -> "already_snake_case"
toSnakeCase("hello")     -> "hello
*/

function toSnakeCase(str) {
    return arrStr = str.trim().replace(/\s+/g, ' ').toLowerCase().split(' ').join('_')
}

console.log(toSnakeCase("first name"));//  ->"first_name"
console.log(toSnakeCase("last    name"));//  ->"last_name"
console.log(toSnakeCase("    I love Java Script"));//  ->"i_love_java_script"
console.log(toSnakeCase("already_snake_case"));//   -> "already_snake_case"
console.log(toSnakeCase("hello"));//     -> "hello

//Task 3
/*
Write a function named alternatingCases() which takes a string argument and 
returns the string with alternating capitalization.
NOTE: The first letter should always be uppercase and non-letter characters are 
ignored.
Examples:
alternatingCases("Hello")  -> "HeLlO"
alternatingCases("basketball")  -> "BaSkEtBaLl"
alternatingCases("Tech Global")  -> "TeCh GlObAl"
alternatingCases("")  -> ""
alternatingCases("123!@#aB")  -> "123!@#Ab"
*/

function alternatingCases(str) {
    str = str.trim().toLowerCase().split('')
    for (let i = 0; i < str.length; i++) {
        if (str[i] >= 'a' && str[i] <= 'z'){
            str[i] = str[i].toUpperCase()
            i = i+1
        } 
    }
    return str.join('')
// or
    return str.trim().toLowerCase().split('')
    .filter((i) => (i >= 'a' && i <= 'z')? i.toUpperCase(): '').join('')
}

console.log(alternatingCases("Hello"));//  -> "HeLlO"
console.log(alternatingCases("basketball"));//  -> "BaSkEtBaLl"
console.log(alternatingCases("Tech Global"));//  -> "TeCh GlObAl"
console.log(alternatingCases(""));//  -> ""
console.log(alternatingCases("123!@#aB"));//  -> "123!@#Ab"

//Task 4
/*
Write a function named isNeutral() that takes two strings comprised of + and 
-, and return a new string which shows how the two strings interact in the 
following way:
When positives and positives interact, they remain positive.
When negatives and negatives interact, they remain negative.
But when negatives and positives interact, they become neutral, and are 
shown as the number 0.
Note: The two strings will be the same length.
Examples
isNeutral("-", "+")      ->  "0"
isNeutral("-+", "-+")  ->   "-+"
isNeutral("-++-", "-+-+")            ->  "-+00"
isNeutral("--++--", "++--++")      ->  "000000"
isNeutral("+++", "+++")            ->  "+++"
*/
// + + = +
// - - = -
// + - = 0

function isNeutral(str1, str2) {
    const newStr = []
    for (let i = 0; i < str1.length; i++) {
            if(str1[i] === '-' && str2[i] === '-') {
                newStr.push('-')
            }
            if(str1[i] === '+' && str2[i] === '+') {
                newStr.push('+')
            }
            if(str1[i] === '-' && str2[i] === '+') {
                newStr.push('0')
            }  
            if(str1[i] === '+' && str2[i] === '-') {
                newStr.push('0')
            }      
    }  
    return newStr.join('') 

    // 2 way
    let newStr1 = ''
    str1[i] === str2[i] ? newStr1 += str1[i] : newStr1 += '0'  
    return newStr1
}

console.log(isNeutral("-", "+"));//      ->  "0"
console.log(isNeutral("-+", "-+"));//  ->   "-+"
console.log(isNeutral("-++-", "-+-+"));//            ->  "-+00"
console.log(isNeutral("--++--", "++--++"));//      ->  "000000"
console.log(isNeutral("+++", "+++"));//            ->  "+++"

//Task 5
/*
Write a function named isTrueOrFalse() which takes a string with sets of character/words 
separated by space. Looking at the first letter of each word (case insensitive-"A" and "a" should 
be treated the same), you need to determine whether it falls into the positive/first half of the 
alphabet ("a"-"m") or the negative/second half ("n"-"z"). Return true if there are more (or 
equal) positive words than negative words, false otherwise.
NOTE: alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
NOTE: Ignore all the digits, spaces and special characters.
Examples
isTrueOrFalse("A big brown fox caught a bad rabbit")  -> true
isTrueOrFalse("Xylophones can obtain Xenon.")    ->  false
isTrueOrFalse("CHOCOLATE MAKES A GREAT SNACK")  -> true
isTrueOrFalse("All FOoD tAsTEs NIcE for someONe")  -> true
isTrueOrFalse("Got stuck in the Traffic")  -> false
*/

function isTrueOrFalse(str) {
    let positive = 0;
    let negative = 0;
    arrStr = str.trim().toUpperCase().split(' ')
    for (let i = 0; i < arrStr.length; i++) {
        if('ABCDEFGHIJKLM'.includes(arrStr[i][0])){
            positive += 1
        }else if ('NOPQRSTUVWXYZ'.includes(arrStr[i][0])){
            negative += 1
        }  
    }
    return positive >= negative  
}

console.log(isTrueOrFalse("A big brown fox caught a bad rabbit"));//  -> true
console.log(isTrueOrFalse("Xylophones can obtain Xenon."));//    ->  false
console.log(isTrueOrFalse("CHOCOLATE MAKES A GREAT SNACK"));//  -> true
console.log(isTrueOrFalse("All FOoD tAsTEs NIcE for someONe"));//  -> true
console.log(isTrueOrFalse("Got stuck in the Traffic"));//  -> false