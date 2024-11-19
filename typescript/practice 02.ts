// OPTIONAL - contains fetch API - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
/*
Create a program that fetches user data from the given URL and performs operations on the obtained data.

Instructions:
Use the provided URL (https://jsonplaceholder.typicode.com/users) to fetch user data.

Define a TypeScript interface for the returned user object

Write a function fetchUsers that uses fetch or any other suitable method to retrieve user data from the given URL.

Implement the following operations using the fetched user data:

1. Print the details of the user with the highest id.
2. Display the names of users whose address contains the word "Suite" in any form (case-insensitive).
3. Calculate and print the average length of usernames.

Use TypeScript throughout your code and ensure that your program handles data types appropriately.

*/

const url = 'https://jsonplaceholder.typicode.com/users';

// fetch(url)
// .then((result) => result.json())
// .then((data) => console.log(data))
// .catch((error) => console.error(error))

interface User {
    id : number,
    name : string,
    username : string,
    email : string,
    address : {
        street : string,
        suite : string,
        city : string,
        zipcode : number,
        geo : {
            lat : number,
            lng : number
        }
    },
    phone : number,
    website : string,
    company : {
        name : string,
        catchPhrase : string,
        bs : string
    }
}

async function getData(): Promise<void> {
    try {
        const response = await fetch(url);
        const data: User[] = await response.json();

        const maxIdUser = data.find(el => el.id === Math.max(...data.map(el => el.id)))
        console.log(maxIdUser)

        const addressUser = data.filter(el => el.address.suite.toLowerCase().includes('suite'))
        addressUser.forEach(el => console.log(el.name))

        const averageUserName = data.reduce((total, user) => (total + user.username.length), 0) / data.length
        console.log(averageUserName)
    } 
    catch (error) {
        console.error(error);
    }
}

getData();
