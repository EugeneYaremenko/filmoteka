'use strict';

import cardTemplate from '../templates/cardFilm.hbs';
import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';
import searchAndPlaginationHomePage from './searchAndPlaginationHomePage';
import navigation from './navigation';

const refs = {
  searchForm: document.querySelector('#js-form'),
  sectionFilm: document.querySelector('#js-film-list'),
  cardFilm: document.querySelector('#js-film-card'),
};

const baseUrl = 'https://api.themoviedb.org/3/search/movie';
const popularUrl = 'https://api.themoviedb.org/3/movie/popular';
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';

const key = '0e322ad2a3bf93179a3983749fdc0c73';
// const language = 'en-US';
const language = 'ua';

let pageNumber = 1;
let renderFilms = [];
let inputValue;
// let genres = {};
// let genres = [];
let genres;

console.log(refs.sectionFilm);
// console.log(refs.cardFilm); //* для картки
// console.log(refs.itemFilm); //* null
// console.log(genres);

//? код від Валєри
refs.searchForm.addEventListener('submit', searchFilms);

function searchFilms(e) {
  e.preventDefault();

  inputValue = e.currentTarget.elements.query.value;

  // fetchPopularMoviesList(pageNumber);
  fetchPopularMoviesList();
  // fetchGenres();
}

async function createCardFunc(imgPath, filmTitle, movieId) {
  const markupCard = await cardTemplate(imgPath, filmTitle, movieId);
  refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);

  // refs.sectionFilm.addEventListener('click', activeDetailsPage(movieId, false));
  refs.sectionFilm.addEventListener('click', event => {
    console.log(event.target.offsetParent);

    // navigation.activeDetailsPage(movieId, false);
  });
}

// async function fetchPopularMoviesList(pageNumber) {
async function fetchPopularMoviesList() {
  const requestParams = `?api_key=${key}&query=${inputValue}&page=${pageNumber}`;

  try {
    let response = await fetch(popularUrl + requestParams);
    let data = await response.json();
    let results = await data.results;

    console.log(results.length);

    if (results.length > 1) {
      clearFilmList();
    }
    // createCardFunc(data.results);

    createCardFunc(results);
    // console.log(results);

    renderFilms = results;
    renderFilm(renderFilms);

    return renderFilms;
  } catch (error) {
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
  fetchGenres();
  const cardImage = films.map(film => cardTemplateFilm(film)).join('');
  refs.cardFilm.insertAdjacentHTML('beforeend', cardImage);
}

// async function fetchGenres() {
//   const requestParams = `?api_key=${key}&language=${language}`;
//   try {
//     let response = await fetch(genresUrl + requestParams);
//     let data = await response.json;
//     let lists = await data.genres;
//     genres = results;
//     return genres;
//   } catch (error) {
//     return error;
//   }
// }

function fetchGenres() {
  const requestParams = `?api_key=${key}&language=${language}`;
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
      console.warn(error);
    });
}

// fetchGenres();

// renderFilm();
// fetchPopularMoviesList();
// fetchGenres();

function clearFilmList() {
  refs.sectionFilm.innerHTML = '';
}
