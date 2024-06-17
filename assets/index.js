const formEl = document.getElementById("search");
const searchEl = document.getElementById("search-movie");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let filmHtml = "";
  fetch(`http://www.omdbapi.com/?apikey=e56c8dbc&s=${searchEl.value}`)
    .then((res) => res.json())
    .then(
      (data) => console.log(data)
      // data.forEach((film) => {
      //   filmHtml += `<div class="film-container">
      //   <img src="${film.poster}>

      //   </div>

      // `;
      //   console.log(data);
      // })
    );
});
