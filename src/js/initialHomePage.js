'use strict';

import cardTemplate from '../templates/cardFilm.hbs';
import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';
// import searchAndPlaginationHomePage from './searchAndPlaginationHomePage';
// import {activeDetailsPage} from './navigation';
import index from '../index';

const refs = {
  searchForm: document.querySelector('#js-form'),
  sectionFilm: document.querySelector('#js-film-list'),
  itemFilm: document.querySelector('#js-film-item'),
  error: document.querySelector('#js-error'),
  cardFilm: document.querySelector('#js-film-card'),
  prevButton: document.querySelector('#js-prev-button'),
  nextButton: document.querySelector('#js-next-button'),

  sectionHomePage: document.querySelector('#js-home-page'),
  sectionLibraryPage: document.querySelector('#js-library-page'),
  sectionDetailsPage: document.querySelector('#js-details-page'),
};

const baseUrl = 'https://api.themoviedb.org/3/search/movie';
const popularUrl = 'https://api.themoviedb.org/3/movie/popular';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

const key = '0e322ad2a3bf93179a3983749fdc0c73';
const languageEn = 'en-US';
const languageUa = 'ua';

let pageNumber = 1;
let renderFilms = [];
let genres;

let imgPath;
let filmTitleth;
let movieId;

// console.log(index.pageNumber);
console.log(pageNumber);

console.log(refs.sectionFilm); //* ul
// console.log(refs.cardFilm); //* для картки
// console.log(refs.itemFilm); //* null
// console.log(genres);

async function createCardFunc(imgPath, filmTitle, movieId) {
  // async function createCardFunc(renderFilms) {

  // const markupCard = await cardTemplate(renderFilms);
  const markupCard = await cardTemplate(imgPath, filmTitle, movieId);
  refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);

  // const markupFilm = renderFilms.map(function (movie) {
  // const markupFilm = renderFilms.forEach(function (movie) {

  function name(a, b) {
    return a + b;
  }
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

  refs.sectionFilm.addEventListener('click', event => {
    console.log(event.target.offsetParent);
    console.log(movieId);

    return activeDetailsPage(movieId, false);
  });
  return refs.itemFilm;
  // return (refs.itemFilm, imgPath, filmTitle, movieId);
}

async function fetchPopularMoviesList(pageNumber) {
  const requestParams = `?api_key=${key}&language=${languageEn}&page=${pageNumber}`;

  try {
    let response = await fetch(popularUrl + requestParams);
    let data = await response.json();
    let results = await data.results;

    if (results.length > 1) {
      clearFilmList();
    }

    createCardFunc(results);
    // createCardFunc(renderFilms);

    renderFilms = results;
    // renderFilm(renderFilms);
    console.log(renderFilms);

    if (pageNumber >= 1) {
      // refs.prevButton.classList.add('visually-hidden');
      refs.prevButton.classList.remove('visually-hidden');
    } else {
      // refs.prevButton.classList.remove('visually-hidden');
      refs.prevButton.classList.add('visually-hidden');
    }

    return renderFilms;
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
      genres = data.genres;

      console.log(genres);

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

// let selectFilm = {};

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
