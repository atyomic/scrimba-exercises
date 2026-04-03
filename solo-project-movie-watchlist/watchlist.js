const movieCards = document.getElementById('movieCards')
const movieCollection = document.getElementById('movie-collection')
const placeholder = document.getElementById('placeholder')
let database = JSON.parse(localStorage.getItem('database')) || []

function removeMovie(event, i) {
    event.preventDefault()
    database.splice(i, 1)

    localStorage.setItem('database', JSON.stringify(database))

    render()
}

function render() {
    if (database.length > 0) {
        placeholder.classList.add('placeholder-disabled')
        renderCollection()
    } else if (database.length === 0) {
        movieCollection.classList.add('placeholder-disabled')
        placeholder.classList.remove('placeholder-disabled');
        return; 
    }
}



function renderCollection() {

    placeholder.classList.add('placeholder-disabled');

    movieCollection.innerHTML = ""

    for (let i = 0; i < database.length; i++) {
        movieCollection.innerHTML += `
        <div class="movie-card">
            <img class="poster" src="${database[i].Poster}" alt="${database[i].Title} poster">
        <div class="movie-details">
            <div class="movie-header">
                <h3>${database[i].Title}</h3>
            </div>
            <div class="movie-tags">
                <p>${database[i].Runtime}</p>
                <p>${database[i].Genre}</p>
                <a onclick="removeMovie(event, ${i})" href="#" class="remove-watchlist">Remove</a>
            </div>
            <p>${database[i].Plot}</p>
        </div>
        </div>
    `
    }
}

render();