import cardTemplate from '../templates/cardFilm.hbs';

let inputValue;
let pageNumber = 1;
let renderFilms;
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

  inputValue = e.currentTarget.elements.query.value;

  fetchFilms(inputValue);
  // fetchPopularMoviesList();
}

function clearFilmList() {
  refs.filmList.innerHTML = '';
}

function fetchFilms(inputValue) {
  const key = '0e322ad2a3bf93179a3983749fdc0c73';
  const requestParams = `?api_key=${key}&query=${inputValue}&page=${pageNumber}`;
  fetch(baseUrl + requestParams)
    .then(response => response.json())
    .then(data => {
      renderFilms = data;
      console.log(renderFilms);
      if (renderFilms.total_results == 0) {
        document.querySelector('#js-error').classList.remove('visually-hidden');
      } else {
        clearFilmList();
        insertListItems(data.results);
        //   createCardFunc(data.results);
      }
      if (pageNumber <= 1) {
        refs.prevButton.classList.add('visually-hidden');
      } else {
        refs.prevButton.classList.remove('visually-hidden');
      }
    });
}

async function insertListItems(images) {
  const markupGallery = await cardTemplate(images);
  refs.filmList.insertAdjacentHTML('beforeend', markupGallery);
}

function plaginationNavigation(e) {
  event.preventDefault();

  if (event.target.nodeName == 'BUTTON') {
    if (event.target.name == 'Prev') {
      pageNumber -= 1;
    } else if (event.target.name == 'Next') {
      pageNumber += 1;
    }

    fetchFilms(inputValue);
  }
}
