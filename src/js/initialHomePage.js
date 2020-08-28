'use strict';

// import cardTemplate from '../templates/cardFilm.hbs';

let renderFilms;
let genres;
let pageNumber = 0;

const refs = {
  sectionFilm: document.querySelector('#js-film-list'),
};

refs.sectionFilm.addEventListener('click', createCardFunc);

console.log(renderFilms);
console.log(genres);
console.log(pageNumber);
console.log(refs).sectionFilm;

async function createCardFunc(imgPath, filmTitle, movieId) {
  const markupCard = await cardTemplate(images);
  refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);
}



// function activeDetailsPage(movieId, false) {}

// function fetchPopularMoviesListn(pageNumber) {}

// function fetchGenres() {}

fetchPopularMoviesList();
fetchGenres();
