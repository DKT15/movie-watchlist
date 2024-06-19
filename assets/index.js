const formEl = document.getElementById("search");
const searchEl = document.getElementById("search-movie");
const filmContainerEl = document.getElementById("film-container");

let moviesTitleArr = [];
let movieId = [];

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&s=${searchEl.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      pushData(data.Search, moviesTitleArr, movieId); //using the pushData function to get access to each movie that appears in the search. It is then being used to extract each title and imdbID.
      renderData(moviesTitleArr); //this uses the movie title that has been passed in from the API.
    });
});

function pushData(arr1, arr2, arr3) {
  for (let movie of arr1) {
    arr2.push(movie.Title); //pushing the moving title onto the moviesTitleArr.
    arr3.push(movie.imdbID); //pushing the imdbID onto the movieId.
  }
}

//Using the movie title as a result of GET, the api is being used again based on the title of the movie. The HTML code then collects and formats everything that I'm asking from the api which includes, movie title, image, genre etc.
function renderData(titleArr) {
  filmContainerEl.innerHTML = "";
  let Html = [];
  for (let movie of titleArr) {
    fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&t=${movie}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.Response === "True") {
          Html = filmContainerEl;
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
        }
      });
  }
}
