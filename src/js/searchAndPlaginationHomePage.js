import cardTemplate from '../templates/cardFilm.hbs';
import { createCardFunc, fetchPopularMoviesList } from './initialHomePage';
import global from './constants';

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
  global.pageNumber = 1;
  refs.pageNum.textContent = global.pageNumber;
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
      global.renderFilms = data.results;
      if (global.renderFilms.total_results === 0) {
        document.querySelector('#js-error').classList.remove('visually-hidden');
      } else {
        document.querySelector('#js-error').classList.add('visually-hidden');
        clearFilmList();
        createCardFunc(global.renderFilms);
      }
      if (global.pageNumber <= 1) {
        refs.prevButton.classList.add('visually-hidden');
      } else {
        refs.prevButton.classList.remove('visually-hidden');
      }
      return global.renderFilms;
    })
    .catch(error => {
      refs.error.classList.remove('visually-hidden');
      console.warn(error);
    });
}

export function plaginationNavigation(e) {
  event.preventDefault();
  if (event.target.nodeName == 'BUTTON') {
    if (event.target.name == 'Prev' && global.pageNumber !== 1) {
      global.pageNumber -= 1;
    } else if (
      event.target.name == 'Next' &&
      global.pageNumber !== global.renderFilms.total_pages
    ) {
      global.pageNumber += 1;
    }
    refs.pageNum.textContent = global.pageNumber;

    if (global.inputValue == '') {
      fetchPopularMoviesList(global.inputValue);
    } else {
      fetchFilms(global.inputValue);
    }
  }
}

export { clearFilmList };
