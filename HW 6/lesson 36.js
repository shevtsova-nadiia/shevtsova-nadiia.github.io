const url = "https://solar-poised-salad.glitch.me/nadiia";

const saveBtnMain = document.querySelector(".save-btn-main");
saveBtnMain.addEventListener("click", () => {
    location.href = `save.html`;   
});
const addBtnMain = document.querySelector(".add-btn-main");
addBtnMain.addEventListener("click", () => {
    location.href = `toCart.html`;   
});
const addProductBtnMain = document.querySelector(".add-product-btn-main");
addProductBtnMain.addEventListener("click", () => {
    location.href = `add-product.html`;   
});
const adminMain = document.querySelector(".admin");
adminMain.addEventListener("click", () => {
    location.href = `admin_page.html`;   
});


const listProducts = (arr) => {
    const divCard = document.querySelector(".card-list");
    divCard.innerHTML="";
    arr.forEach(product => {
        const cardBox = `
        <div class="card" style="width: 19rem;">
        <img src="${product.imageUrl}" class="card-img">
        <div class="card-box">
        <h4 class="card-title">${product.title}</h4>
        <h6 class="card-text">${product.description}</h6>
        <h5 class="card-price">${product.price}</h5>
        <button class="details-btn" data-product-id="${product.id}">See Details</button>
        <button data-product-id="${product.id}" class="save-btn">Save</button>
        <button data-product-id="${product.id}" class="add-btn">Add to Cart</button>
        </div>
        </div>`
        divCard.insertAdjacentHTML("beforeend", cardBox); 
    });
};

// function click btn to go to movie page
const pageProduct = function () {
    const detailsBtn = document.querySelectorAll(".details-btn");
    console.log(detailsBtn);
        detailsBtn.forEach((btn) => {
          btn.addEventListener("click", function () {
            location.href = `product.html?productId=${btn.dataset.productId}`;
        });
    });
};

const pageToCart = function (results) {
const addList = JSON.parse(localStorage.getItem("AddArrInPage")) || [];
console.log(addList);

    const addBtn = document.querySelectorAll(".add-btn");
    console.log(addBtn);
        addBtn.forEach((btn) => {  
          btn.addEventListener("click", function () {
            console.log(addList); 
            console.log(btn.dataset.productId);
            const addProduct = results.find((product) => product.id == btn.dataset.productId);
            //if (addtoCartProduct && !addtoCartList.includes(addtoCartProduct)){
            addList.push(addProduct);
            console.log(addList);
            //};
            localStorage.setItem("AddArr", JSON.stringify(addList));
            });
        });
};

const pageToSave = function (results) {
    const saveList = JSON.parse(localStorage.getItem("SaveArrInPage")) || [];
    console.log(saveList);
   
    const saveBtn = document.querySelectorAll(".save-btn");
    console.log(saveBtn);
        saveBtn.forEach((btn) => {
          btn.addEventListener("click", function () {
            console.log(saveList);
            const saveProduct = results.find((product) => product.id == btn.dataset.productId);
            if (saveProduct && !saveList.includes(saveProduct)){
            saveList.push(saveProduct);
            console.log(saveList);
            };
            localStorage.setItem("SaveArr", JSON.stringify(saveList));
            });
        });
};


const getProducts = async function () {
    try {
        const response = await axios(url);
        console.log(response.data); 
        listProducts(response.data); 
        pageProduct();
        pageToCart(response.data);
        pageToSave(response.data);
    } catch (error) {
        console.log(error);  
    }
};
    getProducts();
