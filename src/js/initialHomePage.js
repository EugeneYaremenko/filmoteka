'use strict';

import cardTemplate from '../templates/cardFilm.hbs';
import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';
// import searchAndPlaginationHomePage from './searchAndPlaginationHomePage';
import navigation from './navigation';

const refs = {
  searchForm: document.querySelector('#js-form'),
  sectionFilm: document.querySelector('#js-film-list'),
  itemFilm: document.querySelector('#js-film-item'),
  error: document.querySelector('#js-error'),
  cardFilm: document.querySelector('#js-film-card'),

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

console.log(refs.sectionFilm); //* ul
// console.log(refs.cardFilm); //* для картки
// console.log(refs.itemFilm); //* null
// console.log(genres);

async function createCardFunc(imgPath, filmTitle, movieId) {
  const markupCard = await cardTemplate(imgPath, filmTitle, movieId);
  refs.sectionFilm.insertAdjacentHTML('beforeend', markupCard);

  refs.sectionFilm.addEventListener('click', event => {
    console.log(event.target.offsetParent);
    return activeDetailsPage(movieId, false);
    // navigation.activeDetailsPage(movieId, false);
  });
  return refs.itemFilm;
}

// async function fetchPopularMoviesList(pageNumber) {
async function fetchPopularMoviesList() {
  const requestParams = `?api_key=${key}&language=${languageEn}&page=${pageNumber}`;

  try {
    let response = await fetch(popularUrl + requestParams);
    let data = await response.json();
    let results = await data.results;

    // console.log(results.length);

    if (results.length > 1) {
      clearFilmList();
    }

    createCardFunc(results);
    
    renderFilms = results;
    // renderFilm(renderFilms);
    console.log(renderFilms);
    
    return renderFilms;
  } catch (error) {
    refs.error.classList.remove('visually-hidden');
    return console.warn(error);
  }
}

// function renderFilm(films) {
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
//   fetchGenres();
//   const cardImage = films.map(film => cardTemplateFilm(film)).join('');
//   refs.cardFilm.insertAdjacentHTML('beforeend', cardImage);
// }



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

// function renderFilm(films) {
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
//   fetchGenres();
//   const cardImage = films.map(film => cardTemplateFilm(film)).join('');
//   refs.cardFilm.insertAdjacentHTML('beforeend', cardImage);
// }