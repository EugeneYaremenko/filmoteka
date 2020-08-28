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
fetch(moviesRef + key)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.dir(data);
    
    console.log(data.hits);

    renderGallery(data.hits);
  });

function renderGallery(pictures) {
  const gallery = pictures.map(picture => cardTemplate(picture)).join('');
  // console.log(gallery);

  galleryRef.insertAdjacentHTML('beforeend', gallery);
}
