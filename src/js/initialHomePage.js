'use strict';

import cardTemplate from '../templates/cardFilm.hbs';
import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';
// import searchAndPlaginationHomePage from './searchAndPlaginationHomePage';
import navigation from './navigation';
import { activeDetailsPage } from './navigation';
import global from './constants';
// import {activeDetailsPage} from './navigation';
// import index from '../index';
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

const baseUrl = 'https://api.themoviedb.org/3/search/movie';
const popularUrl = 'https://api.themoviedb.org/3/movie/popular';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

const key = '0e322ad2a3bf93179a3983749fdc0c73';
const languageEn = 'en-US';
const languageUa = 'ua';

// let pageNumber = 1;
// let renderFilms = [];
let genres;
let imgPath;
let filmTitleth;
let movieId;

// console.log(index.pageNumber);
console.log(global.pageNumber);

console.log(refs.sectionFilm); //* ul
// console.log(refs.cardFilm); //* для картки
// console.log(refs.itemFilm); //* null
// console.log(genres);

async function createCardFunc(results) {
  const markupCard = await cardTemplate(results);
  refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);
  refs.sectionFilm.addEventListener('click', event => {
    if (event.target.nodeName === 'A') {
      console.log('event.target.id ', event.target.id);
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

// async function createCardFunc(imgPath, filmTitle, movieId) {
  // async function createCardFunc(renderFilms) {

  // const markupCard = await cardTemplate(renderFilms);
//   const markupCard = await cardTemplate(imgPath, filmTitle, movieId);
//   refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);

  // const markupFilm = renderFilms.map(function (movie) {
  // const markupFilm = renderFilms.forEach(function (movie) {

  // function name(a, b) {
  //   return a + b;
  // }
  // console.log(movie);

  //   imgPath = movie.backdrop_path;
  //   filmTitle = movie.title;
  //   movieId = movie.id;

  // console.log(imgPath);
  // console.log(filmTitle);
  // console.log(movieId);

  // const markupCard = cardTemplate(markupFilm);
  // const markupCard = cardTemplate(imgPath, filmTitle, movieId);
  // refs.sectionFilm.insertAdjacentHTML('beforeend', markupFilm);
  // refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);
  // refs.sectionFilm.insertAdjacentHTML('beforeend', cardTemplate(markupFilm));

//   refs.sectionFilm.addEventListener('click', event => {
//     console.log(event.target.offsetParent);
//     console.log(movieId);

//     return activeDetailsPage(movieId, false);
//   });
//   return refs.itemFilm;
  // return (refs.itemFilm, imgPath, filmTitle, movieId);
// }

// function createCardFunc(movie) {
//   refs.sectionFilm.addEventListener('click', event => {
//     console.log(event.target.offsetParent);
//     console.log('movie initial: ', movie);
//     return activeDetailsPage(movie, false);
//   });
// }

async function fetchPopularMoviesList() {

//   const requestParams = `?api_key=${key}&language=${languageEn}&page=${pageNumber}`;
  const requestParams = `?api_key=${key}&language=${languageEn}&page=${global.pageNumber}`;
  
  try {
    let response = await fetch(popularUrl + requestParams);
    let data = await response.json();
    let results = await data.results;
   if (results.length > 1) {
      clearFilmList();
    }
    createCardFunc(results);

//     renderFilms = results;
    // renderFilm(renderFilms);
    // console.log('renderFilms initial: ', renderFilms);
//     return renderFilms;


    global.renderFilms = results;
    // renderFilm(renderFilms);
    console.log(global.renderFilms);

    // if (global.pageNumber >= 1) {
    //   // refs.prevButton.classList.add('visually-hidden');
    //   refs.prevButton.classList.remove('visually-hidden');
    // } else {
    //   // refs.prevButton.classList.remove('visually-hidden');
    //   refs.prevButton.classList.add('visually-hidden');
    // }

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

function renderFilm(films) {
  // console.log(films); //* (20) [{…}, {…}, ... {…}, {…}]
  // console.log(films[0]); //* {popularity: 614.082, vote_count: 869, video: false, poster_path: "/TnOeov4w0sTtV2gqICqIxVi74V.jpg", id: 605116, …}
  // console.log(films[0].title); //* Project Power
  // console.log(films[0].vote_average); //* Project Power
  // console.log(films[0].popularity); //* 6.7
  // console.log(films[0].id); //* 614.082
  // console.log(films[0].genre_ids); //* (3) [28, 80, 878]
  // console.log(films[0].overview); //* About
  // console.log(films[0].backdrop_path); //* мала фотка на список
  // console.log(films[0].poster_path); //* велика фотка на картку
  // fetchGenres();
  refs.cardFilm.classList.add('visually-hidden');
  const cardImage = films.map(film => cardTemplateFilm(film)).join('');
  // console.log('cardImage initial:', cardImage);
  refs.cardFilm.insertAdjacentHTML('beforeend', cardImage);
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
      genres = data.genres;
      // console.log('genres initial: ', genres);
      return genres;
    })
    .catch(error => {
      refs.error.classList.remove('visually-hidden');
      console.warn(error);
    });
}

// renderFilm();
fetchPopularMoviesList();
fetchGenres();

function clearFilmList() {
  refs.sectionFilm.innerHTML = '';
}



export { renderFilms };

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

function activeDetailsPage(movieId, itsLibraryFilm) {
  refs.sectionDetailsPage.classList.remove('visually-hidden');
  refs.sectionHomePage.classList.add('visually-hidden');
  refs.sectionLibraryPage.classList.add('visually-hidden');

  // console.log(renderFilms);
  // const rendFilm = renderFilms.find(el => el.id === movieId);
  const rendFilm = renderFilms.find(function (el) {
    // console.log(el.id); //* 605116, ....
    // console.log(movieId); //* undefined

    return el.id === movieId;
  });
  console.log(rendFilm);
  return rendFilm;
  // if (itsLibraryFilm) {
  //   let queueFilmList = [
  //     ...JSON.parse(localStorage.getItem('filmsQueue')),
  //     ...JSON.parse(localStorage.getItem('filmsWatched')),
  //   ];

  //   selectFilm = queueFilmList.find(el => el.id === movieId);
  // }

  // selectFilm = renderFilms.find(el => el.id === movieId); // Участник 1
}

export { createCardFunc, fetchPopularMoviesList, fetchGenres };

//! Куди
//? import { noticeError, mySuccess } from './services/notices';
//* Виклик потрібної функції
//? noticeError();

//! Звідки
//* В самому низу файла, перелік тих функцій, які потрібно експортувати:
//? export { noticeError, mySuccess };

