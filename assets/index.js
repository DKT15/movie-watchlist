const formEl = document.getElementById("search");
const searchEl = document.getElementById("search-movie");
const filmContainerEl = document.getElementById("film-container");

let moviesTitleArr = [];
let movieId = [];
let moviesArray = [];
const storeMovie = localStorage.getItem("watchlist")
  ? JSON.parse(localStorage.getItem("watchlist"))
  : []; // setting up the local storage variable.

let watchlist = storeMovie.length ? storeMovie : []; // movies are added to the watchlist

// when the add button is clicked, the movie is stored in local storage. The ID is used to tell the code which specific movie has been clicked.
document.addEventListener("click", (e) => {
  if (e.target.dataset.watchlist) {
    getIMBDID(e.target.dataset.watchlist);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }
});

// getting the IMBDID for it to be stored in local storage. Adding the the specifc movie based on its ID to the start of the watchlist array.
const getIMBDID = (IMBD) => {
  for (let movie of moviesArray) {
    if (IMBD == movie.imdbID) {
      watchlist.unshift(movie);
    }
  }
  return watchlist; // returning so it executes.
};

formEl.addEventListener("submit", (e) => {
  // stops data from previous search being added onto the data from the new search.
  moviesTitleArr = [];
  movieId = [];
  //preventing the from from refreshing the page.
  e.preventDefault();
  fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&s=${searchEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      pushData(data.Search, moviesTitleArr, movieId); //using the pushData function to get access to each movie that appears in the search. It is then being used to extract each title and imdbID.
      renderData(moviesTitleArr); //this uses the movie title that has been passed in from the API.
    });
  formEl.reset(); //resets the search once submitted.
});

const pushData = (arr1, arr2, arr3) => {
  for (let movie of arr1) {
    arr2.push(movie.Title); //pushing the moving title onto the moviesTitleArr.
    arr3.push(movie.imdbID); //pushing the imdbID onto the movieId.
  }
};

//Using the movie title as a result of GET, the api is being used again based on the title of the movie. The HTML code then collects and formats everything that I'm asking from the api which includes, movie title, image, genre etc.
const renderData = (titleArr) => {
  // clearing out the Dom to prepare it for the movies I would like to add in.
  filmContainerEl.innerHTML = "";
  for (let movie of titleArr) {
    fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&t=${movie}`)
      .then((res) => res.json())
      .then((data) => {
        moviesArray.unshift(data);
        if (data && data.Response === "True") {
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
                  <p class="add-to-watchlist"><i class="fa-solid fa-circle-plus" data-watchlist="${data.imdbID}"></i>Watchlist</p>
              </div>
              <div class="plot">
                  <p>${data.Plot}</p>
              </div>
          </div>
        </div>
        `;
        }
      });
  }
};
