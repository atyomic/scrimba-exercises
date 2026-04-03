const searchMovieBtn = document.getElementById('search-movie')
const searchInput = document.getElementById('search')
const movieCards = document.getElementById('movieCards')
let database = JSON.parse(localStorage.getItem('database')) || []
let currentFilm = []

searchMovieBtn.addEventListener("click", function(e) {
    e.preventDefault()

    const movieTitle = encodeURIComponent(searchInput.value)

    seacrhFilm(movieTitle)
})

async function seacrhFilm(movieTitle) {
     const response = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=653a9bae`);

     const data = await response.json()

    currentFilm = data

     renderCard(data)
}

function renderCard(movieData) {
    movieCards.innerHTML = `
        <div class="movie-card">
            <img class="poster" src="${movieData.Poster}" alt="${movieData.Title} poster">
        <div class="movie-details">
            <div class="movie-header">
                <h3>${movieData.Title}</h3>
                <p class="rating"><img src="img/star-icon.png"> ${movieData.Ratings[0].Value}</p>
            </div>
            <div class="movie-tags">
                <p>${movieData.Runtime}</p>
                <p>${movieData.Genre}</p>
                <a onclick="saveMovie()" href="#" class="add-watchlist">Watchlist</a>
            </div>
            <p>${movieData.Plot}</p>
        </div>
        </div>
    `

    
}

function saveMovie() {
    database.push(currentFilm)
    localStorage.setItem('database', JSON.stringify(database));
}