import cardTemplate from '../templates/cardFilm.hbs';

let inputValue;
let pageNumber = 1;
let renderFilms;

const refs = {
  searchForm: document.querySelector('#js-form'),
  filmList: document.querySelector('#js-film-list'),
  errorMessage: document.querySelector('#js-error'),
};

refs.searchForm.addEventListener('submit', searchFilms);

function searchFilms(e) {
  e.preventDefault();

  inputValue = e.currentTarget.elements.query.value;

  console.log(inputValue);

  fetchFilms(inputValue);
  // fetchPopularMoviesList();
}

function clearFilmList() {
  refs.filmList.innerHTML = '';
}

const baseUrl = 'https://api.themoviedb.org/3/search/movie';

//   'https://api.themoviedb.org/3/search/movie?api_key=0e322ad2a3bf93179a3983749fdc0c73&query=terminator'

function fetchFilms(inputValue) {
  const key = '0e322ad2a3bf93179a3983749fdc0c73';

  const requestParams = `?api_key=${key}&query=${inputValue}&page=${pageNumber}`;
  fetch(baseUrl + requestParams)
    .then(response => response.json())
    .then(data => {
      renderFilms = data;

      console.log(renderFilms);
      if (renderFilms.total_results == 0) {
        document.querySelector('#js-error').style = 'display: inherit';
      } else {
        clearFilmList();
         insertListItems(data.results)
        //   createCardFunc(data.results);
      }
    });

}



async function insertListItems(images) {
  const markupGallery = await cardTemplate(images);
  refs.filmList.insertAdjacentHTML('beforeend', markupGallery);
}