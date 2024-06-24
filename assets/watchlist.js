const watchlistContainerEl = document.getElementById("watchlist-container");
let watchlistArr = JSON.parse(localStorage.getItem("watchlist") || "[]");

document.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    watchlistArr = watchlistArr.filter(
      (movie) => movie.imdbID !== e.target.dataset.remove
    );
    localStorage.setItem("watchlist", JSON.stringify(watchlistArr));
    addToWatchlist();
  }
});

const addToWatchlist = () => {
  watchlistContainerEl.innerHTML = "";
  if (watchlistArr.length) {
    watchlistArr.forEach((data) => {
      watchlistContainerEl.innerHTML += `
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
    });
  }
};
