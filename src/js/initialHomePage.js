'use strict';

import cardTemplate from '../templates/cardFilm.hbs';
import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';
// import searchAndPlaginationHomePage from './searchAndPlaginationHomePage';
import { activeDetailsPage } from './navigation';
import global from './constants';
import { plaginationNavigation } from './searchAndPlaginationHomePage';

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
// const languageUa = 'ua';

// let pageNumber = 1;
// let renderFilms = [];
// let genres;
let imgPath;
let filmTitle;
let movieId;

console.log('global.pageNumber: ', global.pageNumber);

// console.log(refs.sectionFilm); //* ul
// console.log(refs.cardFilm); //* для картки
// console.log(refs.itemFilm); //* null

async function createCardFunc(results) {
  const markupCard = await cardTemplate(results);
  refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);
  refs.sectionFilm.addEventListener('click', event => {
    if (event.target.nodeName === 'A') {
      // console.log('event.target.id ', event.target.id);
      results.forEach(movie => {
        if (movie.id == event.target.id) {
          console.log('event.target.id ', event.target.id);
          console.log('movie: ', movie);
          return activeDetailsPage(movie, false);
        }
      });
    }
    return;
  });
}
// function createCardFunc(movie) {
//   refs.sectionFilm.addEventListener('click', event => {
//     console.log(event.target.offsetParent);
//     console.log('movie initial: ', movie);
//     return activeDetailsPage(movie, false);
//   });
// }

async function fetchPopularMoviesList() {
  const requestParams = `?api_key=${key}&language=${languageEn}&page=${global.pageNumber}`;

  try {
    let response = await fetch(popularUrl + requestParams);
    let data = await response.json();
    let results = await data.results;
    console.log('results initial: ', results);
    if (results.length > 1) {
      clearFilmList();
    }
    createCardFunc(results);

    global.renderFilms = results;
    console.log('global.renderFilms: ', global.renderFilms);

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
      // console.log(data); //* {genres: Array(19)}
      // console.log(data.genres); //* (19) [{…}, {…}, ... {…}, {…}]
      // console.log(data.genres[0].id); //* 28
      // console.log(data.genres[0].name); //* Action
      global.genres = data.genres;
      // console.log('genres initial: ', genres);
      return global.genres;
    })
    .catch(error => {
      refs.error.classList.remove('visually-hidden');
      console.warn(error);
    });
}

fetchPopularMoviesList();
fetchGenres();

function clearFilmList() {
  refs.sectionFilm.innerHTML = '';
}

export { createCardFunc, fetchPopularMoviesList, fetchGenres };

//! export { renderFilms };

// let selectFilm = {};

// function activeDetailsPage(movieId, itsLibraryFilm) {
//   refs.sectionDetailsPage.classList.remove('visually-hidden');
//   refs.sectionHomePage.classList.add('visually-hidden');
//   refs.sectionLibraryPage.classList.add('visually-hidden');

//   console.log(renderFilms);

//   const rendFilm = renderFilms.find(el => el.id === movieId);
//   console.log(rendFilm);

// if (itsLibraryFilm) {
//   let queueFilmList = [
//     ...JSON.parse(localStorage.getItem('filmsQueue')),
//     ...JSON.parse(localStorage.getItem('filmsWatched')),
//   ];

//   selectFilm = queueFilmList.find(el => el.id === movieId);
// }

// selectFilm = renderFilms.find(el => el.id === movieId); // Участник 1
// }

// export { createCardFunc, fetchPopularMoviesList, fetchGenres };

// function activeDetailsPage(movieId, itsLibraryFilm) {
//   refs.sectionDetailsPage.classList.remove('visually-hidden');
//   refs.sectionHomePage.classList.add('visually-hidden');
//   refs.sectionLibraryPage.classList.add('visually-hidden');

// console.log(renderFilms);
// const rendFilm = renderFilms.find(el => el.id === movieId);
// const rendFilm = renderFilms.find(function (el) {
// console.log(el.id); //* 605116, ....
// console.log(movieId); //* undefined

//   return el.id === movieId;
// });
// console.log(rendFilm);
// return rendFilm;
// if (itsLibraryFilm) {
//   let queueFilmList = [
//     ...JSON.parse(localStorage.getItem('filmsQueue')),
//     ...JSON.parse(localStorage.getItem('filmsWatched')),
//   ];

//   selectFilm = queueFilmList.find(el => el.id === movieId);
// }

// selectFilm = renderFilms.find(el => el.id === movieId); // Участник 1
// }

// export { createCardFunc, fetchPopularMoviesList, fetchGenres };
