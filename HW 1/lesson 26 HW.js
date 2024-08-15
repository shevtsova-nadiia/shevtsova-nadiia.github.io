const inputEl = document.querySelector("input");
const buttonOk = document.getElementById("inputButton");
const ulEl = document.querySelector("ul");



const arrTask = [];
// console.log(arrTask);

// inputEl.addEventListener("input", ()=>{
//     console.log(inputEl.value);  
// });

// arrTask.forEach(el =>{
//     el.task = inputEl.value
// });
// console.log(arrTask);


buttonOk.addEventListener("click", ()=>{

        const newTask = {
        id : arrTask.length+1,
        task : inputEl.value,
        statusTask : ""
        };

        arrTask.push(newTask);
        console.log(arrTask);
        inputEl.value="";
        listTask();
});


const listTask = function(){

ulEl.innerHTML ="";
arrTask.forEach(el=>{
const li = `
<div>
<ul>
    <li>
    <span>${el.id}</span>
    <span>${el.task}</span>
    <span>${el.statusTask}
    <select>
        <option value="create">create</option>
        <option value="todo">to do</option>
        <option value="inprogress">in progress</option>
        <option value="complete">complete</option>
    </select></span>
    <button id="${el.id}" class="btnDelete">Delete</button>
    </li>
</ul>
</div>
`
ulEl.insertAdjacentHTML("beforeend", li);
});

const buttonDelete = document.querySelectorAll("li button");
console.log(buttonDelete);
buttonDelete.forEach((btnDelete, i)=>{
btnDelete.addEventListener("click", function(){
    arrTask.splice(i, 1);
    listTask();
})});
};

listTask();


