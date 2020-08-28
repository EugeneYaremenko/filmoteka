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
console.log(data.result);



      //   console.log(renderFilms.results.length);
    });
  clearFilmList();
  //   createCardFunc(data.results);

  //   if ((renderFilms.results.length = 0)) {
  //   }
}
