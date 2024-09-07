// get data
const apiKey = "api_key=d698eb01fcd2ab11b2c8422e9010e478";
const urlImage = "https://image.tmdb.org/t/p/w200";
const urlSearch = "https://api.themoviedb.org/3/search/movie?query="
const urlGenre = "https://api.themoviedb.org/3/discover/movie?";
const urlGenre1 = "https://api.themoviedb.org/3/discover/movie?with_genres=";
const urlPlayList = "https://api.themoviedb.org/3/movie/";

const favoriteMovieArr = [];

// functions list of films
const listMovies = function (arr) {
    const divMovieList = document.querySelector(".movie-list");
    divMovieList.innerHTML = "";
    arr.forEach((movie) => {
      const cardMovie = `
  <div class = "card-movie">
  <img src="${urlImage + movie.poster_path}">
  <h3>${movie.title}</h3>
  <h4>${movie.release_date}</h4>
  <h5>${movie.vote_average.toFixed(1)}</h5>
  <button class="movie-btn" id="${movie.id}">${movie.title}</button>
  <button class="favorite-btn" data-movie-id="${movie.id}">Add</button> 
  </div>`;
      divMovieList.insertAdjacentHTML("beforeend", cardMovie);
    });
  };

// function list of favorite films
  const listFavoriteMovies = function (arr,results) {
    const divFavoriteMovie = document.querySelector(".favorite-movie-list");
    divFavoriteMovie.innerHTML = "";
    if (arr.length === 0) {
      divFavoriteMovie.classList.remove("visible");
      //return;
  };
    arr.forEach((movie) => {
      const cardMovie = `
      <div class="card-movie">
      <img src="${urlImage + movie.poster_path}">
      <button class="movie-btn" id="${movie.id}">${movie.title}</button>
      <button class="remove-btn" id="${movie.id}">Remove from favorites</button>
      </div>`;
      divFavoriteMovie.insertAdjacentHTML("beforeend", cardMovie);
      divFavoriteMovie.classList.add("visible");
      pageMovie();
    });
  // function added favorite movie
  const favoriteBtn = document.querySelectorAll(".favorite-btn");
  console.log(favoriteBtn);
  favoriteBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      const foundMovie = results.find(
        (movie) => movie.id == this.dataset.movieId);
      if (foundMovie && !arr.includes(foundMovie)){
      arr.push(foundMovie);
      console.log(arr);
      listFavoriteMovies(arr);
      }else{
        alert("This movie added to the favorite list")
      }
    })});
//remove from the favorite list
const removeBtn = document.querySelectorAll(".remove-btn");
removeBtn.forEach((btnDelete, i)=>{
  btnDelete.addEventListener("click", function(){      
    console.log(arr);
    arr.splice(i, 1);
    console.log(arr);
    listFavoriteMovies(arr);
  })})
};
// function click btn to go to movie page
const pageMovie = function () {
    const movieBtn = document.querySelectorAll(".movie-btn");
    console.log(movieBtn);
        movieBtn.forEach((btn) => {
          btn.addEventListener("click", function () {
            location.href = `movie.html?movieId=${this.id}`;
          });
        });
    };
    pageMovie();

    const funPagionationPlayList = function (option){
      const previousBtn = document.querySelector(".previous");
      const currentBtn = document.querySelector(".current-page");   
      const nextBtn = document.querySelector(".next");
      let indexPage = 1;
      currentBtn.textContent = `${indexPage} page`;
      previousBtn.disabled = true;
      nextBtn.addEventListener("click", function(){ 
      previousBtn.disabled = false;                
         const nextPage = async () =>{
          try {
              indexPage += 1;
              if (indexPage == 500){
                  nextBtn.disabled = true} 
              console.log(indexPage);
          const {data: { results },} = await axios(`${urlPlayList+option+"?page="+indexPage+"&"+apiKey}`);    
          console.log(results);
          listMovies (results);      
          listFavoriteMovies(favoriteMovieArr,results);
          pageMovie();
          currentBtn.textContent = `${indexPage} page`;
          } catch (error) {
              console.log(error);
          }
      }
      nextPage();
      }); 
      previousBtn.addEventListener("click", function(){ 
          nextBtn.disabled = false;
          const previousPage = async () =>{
           try {
               indexPage -= 1;
               if (indexPage == 1){
                  previousBtn.disabled = true}  
               console.log(indexPage);
           const {data: { results },} = await axios(`${urlPlayList+option+"?page="+indexPage+"&"+apiKey}`);    
           console.log(results);
           listMovies (results);
           listFavoriteMovies(favoriteMovieArr,results);
           pageMovie();
           //console.log(results.data.page);
           currentBtn.textContent = `${indexPage} page`;
           } catch (error) {
               console.log(error);
           }
       }
       previousPage();
       }); 
  };
  const funPagionationGenre = function (option){
    const previousBtn = document.querySelector(".previous");
    const currentBtn = document.querySelector(".current-page");   
    const nextBtn = document.querySelector(".next");
    let indexPage = 1;
    currentBtn.textContent = `${indexPage} page`;
    previousBtn.disabled = true;
    nextBtn.addEventListener("click", function(){ 
    previousBtn.disabled = false;                
       const nextPage = async () =>{
        try {
            indexPage += 1;
            if (indexPage == 500){
                nextBtn.disabled = true} 
            console.log(indexPage);
        const {data: { results },} = await axios(`${urlGenre+"page="+indexPage+"&with_genres="+option+"&"+apiKey}`);    
        console.log(results);
        listMovies (results);
        listFavoriteMovies(favoriteMovieArr,results);
        pageMovie();
        currentBtn.textContent = `${indexPage} page`;
        } catch (error) {
            console.log(error);
        }
    }
    nextPage();
    }); 
    previousBtn.addEventListener("click", function(){ 
        nextBtn.disabled = false;
        const previousPage = async () =>{
         try {
             indexPage -= 1;
             if (indexPage == 1){
                previousBtn.disabled = true}  
             console.log(indexPage);
         const {data: { results },} = await axios(`${urlGenre+"page="+indexPage+"&with_genres="+option+"&"+apiKey}`);    
         console.log(results);
         listMovies (results);
         listFavoriteMovies(favoriteMovieArr,results);
         pageMovie();
         currentBtn.textContent = `${indexPage} page`;
         } catch (error) {
             console.log(error);
         }
     }
     previousPage();
     }); 
};
const funPagionationSearch = function (option){
  const previousBtn = document.querySelector(".previous");
  const currentBtn = document.querySelector(".current-page");   
  const nextBtn = document.querySelector(".next");
  let indexPage = 1;
  currentBtn.textContent = `${indexPage} page`;
  previousBtn.disabled = true;
  nextBtn.addEventListener("click", function(){ 
  previousBtn.disabled = false;                
     const nextPage = async () =>{
      try {
          indexPage += 1;
          if (indexPage == 500){
              nextBtn.disabled = true} 
          console.log(indexPage);
      const {data: { results },} = await axios(`${urlSearch+option+"&page="+indexPage+"&"+apiKey}`);    
      console.log(results);
      listMovies (results);
      listFavoriteMovies(favoriteMovieArr,results);
      pageMovie();
      currentBtn.textContent = `${indexPage} page`;
      } catch (error) {
          console.log(error);
      }
  }
  nextPage();
  }); 
  previousBtn.addEventListener("click", function(){ 
      nextBtn.disabled = false;
      const previousPage = async () =>{
       try {
           indexPage -= 1;
           if (indexPage == 1){
              previousBtn.disabled = true}  
           console.log(indexPage);
       const {data: { results },} = await axios(`${urlSearch+option+"&page="+indexPage+"&"+apiKey}`);    
       console.log(results);
       listMovies (results);
       listFavoriteMovies(favoriteMovieArr,results);
       pageMovie();
       currentBtn.textContent = `${indexPage} page`;
       } catch (error) {
           console.log(error);
       }
   }
   previousPage();
   }); 
};
// get popular list of films
const getMovies = async () => {
  try {
    const {data: { results },} = await axios(`${urlPlayList+"popular"+"?page=1"+"&"+apiKey}`);
    console.log(results);
    listMovies(results);
    listFavoriteMovies(favoriteMovieArr,results);
    pageMovie();
    funPagionationPlayList("popular");
        }catch(error){
            console.log(error);
        }
    };
    getMovies();
// search function
const inputEl = document.querySelector("input");
const okBtn = document.querySelector(".ok-btn");
okBtn.addEventListener("click", function(){
    if (!inputEl.value == ""){
  const getSearchData = async () => {
    try {
      const {data:{results}} = await axios (`${urlSearch+inputEl.value+"&page=1"+"&"+apiKey}`);
      console.log(results);
      listMovies(results);
      listFavoriteMovies(favoriteMovieArr, results);
      pageMovie();
      funPagionationSearch(inputEl.value);
      inputEl.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  getSearchData();
}});
// genre movie
const selectGenre = document.querySelector("#genre-movie");
selectGenre.addEventListener("change", function(option){
  console.log(option.target.value);
  const getGenreData = async () =>{
    try {
      const {data:{results}} = await axios(`${urlGenre+"page=1"+"&with_genres="+option.target.value+"&"+apiKey}`);
      console.log(results);
      listMovies(results);
      listFavoriteMovies(favoriteMovieArr, results); 
      pageMovie();
      funPagionationGenre(option.target.value);
    } catch (error) {
      console.log(error);
    }
  }
  getGenreData();
});
// get ALL play lists
const selectPlayList = document.querySelector("#play-list");
selectPlayList.addEventListener("change", function(option){
    console.log(option.target.value);
    const getPlayList = async () => {
    try {
      const {data: { results },} = await axios(`${urlPlayList+option.target.value+"?page=1"+"&"+apiKey}`);
      console.log(results);
      listMovies(results);
      listFavoriteMovies(favoriteMovieArr,results);
      pageMovie();
      funPagionationPlayList(option.target.value)
          }catch(error){
              console.log(error);
          }
      };
      getPlayList();
});

