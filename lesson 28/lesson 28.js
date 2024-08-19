// fetch("https://jsonplaceholder.typicode.com/todos")
// .then((result)=>result.json())
// .then((data)=>console.log(data))
// .catch((error)=>console.log(error));

const buttonEl = document.querySelector("button");
buttonEl.addEventListener("click", ()=>{


// fetch("https://dog.ceo/api/breeds/image/random")
// .then((result)=>result.json())
// .then((data)=>{
//     console.log(data);
//     let pic = data.message;
//     document.querySelector("img").setAttribute("src", pic);
// })
// .catch((error)=>console.log(error));
// });

fetch("https://dog.ceo/api/breeds/image/random")
.then((result)=>result.json())
.then((data)=>document.querySelector("img").setAttribute("src", data.message))
.catch((error)=>console.log(error))
});