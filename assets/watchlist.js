const watchlistContainerEl = document.getElementById("watchlist-container");
// let watchlistArr = JSON.parse(localStorage.getItem("watchlist")) || [];
let watchlistArr = localStorage.getItem("watchlist")
  ? JSON.parse(localStorage.getItem("watchlist"))
  : [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    watchlistArr = e.target.dataset.remove;
    localStorage.removeItem("watchlist", JSON.stringify(watchlistArr));
  }
});

// If anything is added to the watchlist it will be displayed. Otherwise the DOM will display a message requesting the user to add content.
const addToWatchlist = () => {
  if (watchlistArr.length) {
    watchlistContainerEl.innerHTML = "";
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
  } else {
    watchlistContainerEl.innerHTML = `
    <div></div>
      <div id="watchlist-section">
        <h3>Your watchlist is looking a little empty...</h3>
          <div class="add-movie">
          <a class="add-movie-wrapper" href="/film.html">
            <i class="fa-solid fa-circle-plus"></i>
            <p>Let's add some movies!</p>
          </a>
          </div>
      </div>
    <div></div>`;
  }
};

addToWatchlist();
