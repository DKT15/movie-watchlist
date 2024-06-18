const formEl = document.getElementById("search");
const searchEl = document.getElementById("search-movie");
const filmContainerEl = document.getElementById("film-container");

let moviesArr = [];
let movieId = [];

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  moviesArr = [];
  movieId = [];

  fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&s=${searchEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      console.log(pushData(data.Search, moviesArr, movieId));
      renderData(moviesArr);
    });
});

function pushData(arr1, arr2, arr3) {
  for (let movie of arr1) {
    arr2.push(movie.Title);
    arr3.push(movie.imdbID);
  }
}

function renderData(arr) {
  filmContainerEl.innerHTML = "";
  for (let movie of arr) {
    fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&t=${movie}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        filmContainerEl.innerHTML += `
        <div class="movie-wrapper">
          <img class="movie-img" src="${data.Poster}">
          <div class="text-content">
              <div class="title"> 
                  <h3>${data.Title}</h3>
                  <p class="rating"><i class="fa-solid fa-star"></i> ${data.imdbRating}</p>
              </div>
              <div class="line2">
                  <p>${data.Runtime}</p>
                  <p>${data.Genre}</p>
                  <p class="add-to-watchlist" data-watchlist="${data.imdbID}"><i class="fa-solid fa-circle-plus"></i>Watchlist</p>
              </div>
              <div class="plot">
                  <p>${data.Plot}</p>
              </div>
          </div>
        </div>
        `;
      });
  }
}
