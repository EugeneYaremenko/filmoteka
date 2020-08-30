import cardTemplate from '../templates/cardFilm.hbs';
import { createCardFunc, fetchPopularMoviesList } from './initialHomePage';
import global from './constants';
// let inputValue;
// let pageNumber = 1;
// let renderFilms;
const baseUrl = 'https://api.themoviedb.org/3/search/movie';

const refs = {
  searchForm: document.querySelector('#js-form'),
  filmList: document.querySelector('#js-film-list'),
  errorMessage: document.querySelector('#js-error'),
  paginationBlock: document.querySelector('#js-pagination-wrapper'),
  prevButton: document.querySelector('#js-prev-button'),
  nextButton: document.querySelector('#js-next-button'),
  pageNum: document.querySelector('#js-page-number'),
};

refs.searchForm.addEventListener('submit', searchFilms);
refs.paginationBlock.addEventListener('click', plaginationNavigation);
// refs.prevButton.addEventListener('click', plaginationNavigation);
// refs.nextButton.addEventListener('click', plaginationNavigation);

function searchFilms(e) {
  e.preventDefault();

  global.inputValue = e.currentTarget.elements.query.value;

  fetchFilms(global.inputValue);
}

function clearFilmList() {
  refs.filmList.innerHTML = '';
}

function fetchFilms(inputValue) {
  const key = '0e322ad2a3bf93179a3983749fdc0c73';
  const requestParams = `?api_key=${key}&query=${inputValue}&page=${global.pageNumber}`;
  fetch(baseUrl + requestParams)
    .then(response => response.json())
    .then(data => {
      global.renderFilms = data;
      console.log(global.renderFilms);
      if (global.renderFilms.total_results == 0) {
        document.querySelector('#js-error').classList.remove('visually-hidden');
      } else {
        document.querySelector('#js-error').classList.add('visually-hidden');
        clearFilmList();
        // insertListItems(data.results);
        createCardFunc(data.results);
      }
      if (global.pageNumber <= 1) {
        refs.prevButton.classList.add('visually-hidden');
      } else {
        refs.prevButton.classList.remove('visually-hidden');
      }
    });
}

// async function insertListItems(images) {
//   const markupGallery = await cardTemplate(images);
//   refs.filmList.insertAdjacentHTML('beforeend', markupGallery);
// }

function plaginationNavigation(e) {
  event.preventDefault();

  if (event.target.nodeName == 'BUTTON') {
    if (event.target.name == 'Prev') {
      global.pageNumber -= 1;
    } else if (event.target.name == 'Next') {
      global.pageNumber += 1;
    }

    fetchFilms(global.inputValue);
    fetchPopularMoviesList(global.inputValue);
    refs.pageNum.textContent = global.pageNumber;
    console.log(refs.pageNum.textContent);
  }
}
