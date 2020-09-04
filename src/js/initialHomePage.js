'use strict';

import cardTemplate from '../templates/cardFilm.hbs';
// import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';
import { activeDetailsPage } from './navigation';
import global from './constants';
import {
  plaginationNavigation,
  clearFilmList,
} from './searchAndPlaginationHomePage';

const refs = {
  searchForm: document.querySelector('#js-form'),
  sectionFilm: document.querySelector('#js-film-list'),
  itemFilm: document.querySelector('#js-film-item'),
  error: document.querySelector('#js-error'),
  cardFilm: document.querySelector('#js-film-card'),
  prevButton: document.querySelector('#js-prev-button'),
  nextButton: document.querySelector('#js-next-button'),
  paginationBlock: document.querySelector('#js-pagination-wrapper'),

  sectionHomePage: document.querySelector('#js-home-page'),
  sectionLibraryPage: document.querySelector('#js-library-page'),
  sectionDetailsPage: document.querySelector('#js-details-page'),
};

refs.paginationBlock.addEventListener('click', plaginationNavigation);

const popularUrl = 'https://api.themoviedb.org/3/movie/popular';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

const key = '0e322ad2a3bf93179a3983749fdc0c73';
const languageEn = 'en-US';

async function createCardFunc(results) {
  const markupCard = await cardTemplate(results);
  refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);
  refs.sectionFilm.addEventListener('click', event => {
    if (event.target.nodeName === 'A') {
      global.movieId = event.target.id;
      global.movieId = Number(global.movieId);
      return activeDetailsPage(global.movieId, false);
    }
    return;
  });
}

async function fetchPopularMoviesList() {
  const requestParams = `?api_key=${key}&language=${languageEn}&page=${global.pageNumber}`;
  try {
    let response = await fetch(popularUrl + requestParams);
    let data = await response.json();
    let results = await data.results;
    if (results.length > 1) {
      clearFilmList();
    }
    createCardFunc(results);
    global.renderFilms = results;
    if (global.pageNumber <= 1) {
      refs.prevButton.classList.add('visually-hidden');
    } else {
      refs.prevButton.classList.remove('visually-hidden');
    }
    return global.renderFilms;
  } catch (error) {
    refs.error.classList.remove('visually-hidden');
    return console.warn(error);
  }
}

function fetchGenres() {
  const requestParams = `?api_key=${key}&language=${languageEn}`;
  fetch(genresUrl + requestParams)
    .then(response => response.json())
    .then(data => {
      global.genres = data.genres;
      return global.genres;
    })
    .catch(error => {
      refs.error.classList.remove('visually-hidden');
      console.warn(error);
    });
}

fetchPopularMoviesList();
fetchGenres();

export { createCardFunc, fetchPopularMoviesList, fetchGenres };
