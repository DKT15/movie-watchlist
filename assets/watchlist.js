const movie = JSON.parse(localStorage.getItem("movie"));
const movieId = JSON.parse(localStorage.getItem("movieId"));

document.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    //   console.log(removeFromWatchlist(e.target.dataset.remove));
  }
});

filmContainerEl.innerHTML = "";
for (let movie of film) {
  fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&t=${movie}`)
    .then((res) => res.json())
    .then((data) => {
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
                <p class="remove-from-watchlist"><i class="fa-solid fa-circle-minus" data-remove="${data.imdbID}"></i>Remove</p>
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

const addToWatchlist = () => {};
