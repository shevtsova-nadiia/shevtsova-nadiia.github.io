/*
Practice 1: Write Functions with Specific Return Types
Objective: Define functions with clear input and output types.
-Create a function to calculate the product of two numbers. 
-Write a function that takes a string and returns its length.
*/

const multiply = function (number1 : number, number2 : number) : number {
    return number1 * number2
}
console.log(multiply(5, 6));

const stringLength = function (str: string) : number {
    return str.length
}
console.log(stringLength('Jone Doe'))
console.log(stringLength(''))

/*
Objective: Use union types to create a flexible function. 
Task: Create a function that takes a parameter of type string 
| boolean and returns a descriptive message based on the type.
*/

const typeOf = function (parameter : string | boolean) : string {
    return typeof parameter
}
console.log(typeOf('Jone Doe'))
console.log(typeOf(true))

/*
Practice 3: Create and design Interfaces for an E-Commerce Cart System
Requirements: A Product should have id, name, price, and quantity. 
A Cart should have an array of Product and a method to calculate the total price.
*/

interface Product {
    id : number,
    name : string,
    price : number,
    quantity : number
}

interface Cart {
    products : Product[],
    totalPrice() : number
}

const product1 : Product = {
    id : 1,
    name : 'Product1',
    price : 100,
    quantity : 10
}

const product2 : Product = {
    id : 2,
    name : 'Product2',
    price : 200,
    quantity : 5
}

const product3 : Product = {
    id : 3,
    name : 'Product3',
    price : 300,
    quantity : 2
}

const cart : Cart = {
    products : [product1, product2, product3],
    totalPrice() {
        return this.products.reduce((total : number, product : Product) => (total + product.price * product.quantity), 0)
    }
}

console.log(cart.totalPrice())

/*
Practice 4: Write Functions Interacting with Interfaces
Example Task: Write a function that adds a product to the cart. 
Follow up of Practice 3.

Card = [] Product = {} Cart.push(Product)
*/

const product4 : Product = {
    id : 4,
    name : 'Product4',
    price : 400,
    quantity : 1
}
function addProduct(cart : Cart, product : Product) {
    cart.products.push(product)
    return cart
}

console.log(addProduct(cart, product4))