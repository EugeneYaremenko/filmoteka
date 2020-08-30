// import galleryTemplate from '../templates/pixabayGallery.hbs';
import cardTemplate from '../templates/cardFilm.hbs';

const sectionFilm = document.querySelector('#js-film-list');

//* 'https://api.themoviedb.org/3/movie/550?api_key=0e322ad2a3bf93179a3983749fdc0c73'
//* https://api.themoviedb.org/3/search/movie?api_key=0e322ad2a3bf93179a3983749fdc0c73&language=en-US&query=war&page=1&include_adult=false


const moviesRef = 'https://api.themoviedb.org/3/movie/550';
const key = '?api_key=0e322ad2a3bf93179a3983749fdc0c73';
const type = '&image_type=photo';
const orientation = '&orientation=horizontal';
const choose = '&q=woman';

// fetch(picturesRef + key + type + orientation + choose)
// fetch(moviesRef + key)
fetch('https://api.themoviedb.org/3/movie?api_key=0e322ad2a3bf93179a3983749fdc0c73&language=en-US&query=war&page=1&include_adult=false')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.results);
    

    // renderGallery(data.results);
    insertListItems(data.results);
  });

function renderGallery(pictures) {
  const gallery = pictures.map(picture => cardTemplate(picture)).join('');
  // console.log(gallery);

  sectionFilm.insertAdjacentHTML('beforeend', gallery);
}

async function insertListItems(images) {
  const markupGallery = await cardTemplate(images);
  sectionFilm.insertAdjacentHTML('beforeend', markupGallery);
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
