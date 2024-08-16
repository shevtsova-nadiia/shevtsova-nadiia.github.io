import movies from "./data.js";

// dom and variables
let favoriteMovies = [];
let addMovie = null;

const div = document.querySelector(".movie-list");
const divFavoriteList = document.querySelector(".favoritemovie-list");

// function show all movies
const listMovies = function () {
  div.innerHTML = "";
  movies.forEach((el) => {
    const cardMovie = `
    <div class = "movie">
    <img src="${el.poster_path}">
    <h3>${el.title}</h3>
    <button id="${el.id}">Add</button>
    </div>`;
    div.insertAdjacentHTML("beforeend", cardMovie);
  });
  //listMovies();

  // add button
  const buttonAdd = document.querySelectorAll(".movie button");
  buttonAdd.forEach((btnAdd, i) => {
    btnAdd.addEventListener("click", function () {
      addMovie = movies.slice(i, i+1);
    //   listMovies();
      favoriteMovies.push({
        title: addMovie[0].title,
        id: addMovie[0].id,
      });

      // function show favorite movies
      const favoriteListMovies = function () {
        divFavoriteList.innerHTML = "";
        favoriteMovies.forEach((el) => {
          const cardMovieAdd = `
            <div class = "add-list">
            <h3>${el.title}</h3>
            <button id="${el.id}">Delete</button>
            </div>`;
          divFavoriteList.insertAdjacentHTML("beforeend", cardMovieAdd);
        });

        // delete button
        const buttonDelete = document.querySelectorAll(".add-list button");
        buttonDelete.forEach((btnDelete, i) => {
          btnDelete.addEventListener("click", function () {
            favoriteMovies.splice(i, 1);
            favoriteListMovies();
          });
        });
      };
      favoriteListMovies();
    });
  });
};
listMovies();
