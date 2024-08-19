fetch("https://randomuser.me/api/?results=15")
.then((result) => result.json())
.then((data) => {
// created card users
const div = document.querySelector("div");
console.log(div);
data.results.forEach(el => {
    const cardUser = `
    <div class="card-user">
    <div class="foto-name">
    <img src="${el.picture.large}" alt="picture">
    <h2>${el.name.first} ${el.name.last}</h2>
    <h3>${el.gender}</h3>
    </div>
    <div class="info">
    <h3>${el.phone}</h3>
    <h3>${el.email}</h3>
    <h4>City: ${el.location.city}</h4>
    <h4>State: ${el.location.state}</h4>
    <h4>Country: ${el.location.country}</h4>
    <h4>Age:${el.dob.age}</h4>
   
    </div>
    </div>  
    `
div.insertAdjacentHTML("beforeend", cardUser);
});

// the end fetch method
})
.catch((error)=> console.error(error));

