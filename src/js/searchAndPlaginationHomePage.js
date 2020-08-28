import cardTemplate from '../templates/cardFilm.hbs';

let inputValue;
let pageNumber = 1;
let renderFilms;

const refs = {
  searchForm: document.querySelector('#js-form'),
  filmList: document.querySelector('#js-film-list'),
};

refs.searchForm.addEventListener('submit', searchFilms);

function searchFilms(e) {
  e.preventDefault();

  inputValue = e.currentTarget.elements.query.value;

  console.log(inputValue);

  fetchFilms(inputValue);
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

      console.log(data);
      console.log(data.results);

      //   console.log(renderFilms.results.length);
      clearFilmList();
      // renderFilms(data.results);
      insertListItems(data.results);
    });
  //   createCardFunc(data.results);

  //   if ((renderFilms.results.length = 0)) {
  //   }
}

// function renderFilms(pictures) {
// renderFilms(pictures) {
  // const gallery = pictures.map(picture => cardTemplate(picture)).join('');
  // console.log(gallery);

  // refs.filmList.insertAdjacentHTML('beforeend', gallery);
// }
// 

async function insertListItems(images) {
  const markupGallery = await cardTemplate(images);
  refs.filmList.insertAdjacentHTML('beforeend', markupGallery);
}