// Участник №04

import global from './constants';
import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';

const refs = {
  detailsPage: document.querySelector('#js-details-page-wrapper'),

  // mainImg: document.querySelector('#js-mainImg'),
  // descriptionTitle: document.querySelector('#js-descriptionTitle'),
  // tableVote: document.querySelector('.js-tableVote'),
  // tablePopularity: document.querySelector('.js-tablePopularity'),
  // tableOriginalTitle: document.querySelector('.js-tableOriginalTitle'),
  // tableGenre: document.querySelector('#js-table-genre'),
  // descriptionAboutInfo: document.querySelector('#js-descriptionAboutInfo'),
  addQueueButton: document.querySelector('#js-addQueueButton'),
  addWatchedButton: document.querySelector('#js-addWatchedButton'),
};

function monitorButtonStatusText() {
  let filmsFromQueueLS = localStorage.getItem('filmsQueue');
  let filmsFromWatchedLS = localStorage.getItem('filmsWatched');

  if (filmsFromQueueLS !== null) {
    JSON.parse(filmsFromQueueLS).find(ar => ar.id === global.selectFilm.id)
      ? (refs.addQueueButton.textContent = 'Delete from queue')
      : (refs.addQueueButton.textContent = 'Add to queue');
  } else refs.addQueueButton.textContent = 'Add to queue';

  if (filmsFromWatchedLS !== null) {
    JSON.parse(filmsFromWatchedLS).find(ar => ar.id === global.selectFilm.id)
      ? (refs.addWatchedButton.textContent = 'Delete from watched')
      : (refs.addWatchedButton.textContent = 'Add to watched');
  } else refs.addWatchedButton.textContent = 'Add to watched';
}

let arrQ = [];
let arrW = [];

function toggleToQueue() {
  const filmsQueueLS = JSON.parse(localStorage.getItem('filmsQueue'));
  if (filmsQueueLS === null) {
    arrQ.push(global.selectFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(arrQ));
    monitorButtonStatusText();
    return;
  }
  if (filmsQueueLS !== null && arrQ.includes(global.selectFilm)) {
    let arrQ2 = arrQ.filter(ar => {
      return ar.id !== global.selectFilm.id;
    });
    localStorage.setItem('filmsQueue', JSON.stringify(arrQ2));
    arrQ = arrQ2;
    monitorButtonStatusText();
    return;
  }
  arrQ.push(global.selectFilm);
  localStorage.setItem('filmsQueue', JSON.stringify(arrQ));
  monitorButtonStatusText();
}

function toggleToWatched() {
  const filmsWatchedLS = JSON.parse(localStorage.getItem('filmsWatched'));
  console.log('filmsWatchedLS BEGIN: ', filmsWatchedLS);
  if (filmsWatchedLS === null) {
    arrW.push(global.selectFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(arrW));
    monitorButtonStatusText();
    return;
  }
  if (filmsWatchedLS !== null && arrW.includes(global.selectFilm)) {
    let arrW2 = arrW.filter(ar => {
      return ar.id !== global.selectFilm.id;
    });
    localStorage.setItem('filmsWatched', JSON.stringify(arrW2));
    arrW = arrW2;
    monitorButtonStatusText();
    return;
  }
  arrW.push(global.selectFilm);
  localStorage.setItem('filmsWatched', JSON.stringify(arrW));
  monitorButtonStatusText();
}

async function showDetails(selectFilm) {
  // console.log('selectFilm showDetails: ', global.selectFilm);
  // refs.mainImg.setAttribute(
  //   'src',
  //   `https://image.tmdb.org/t/p/w500/${selectFilm.poster_path}`,
  // );
  // refs.descriptionTitle.textContent = selectFilm.title;
  // refs.tableVote.textContent = `${selectFilm.vote_average} / ${selectFilm.vote_count}`;
  // refs.tablePopularity.textContent = selectFilm.popularity;
  // refs.tableOriginalTitle.textContent = selectFilm.original_title;
  // refs.tableGenre.textContent = selectFilm.genre_ids;
  // refs.descriptionAboutInfo.textContent = selectFilm.overview;
  // console.log('genresString:', genresString, genresString.length);

  // console.log('refs.tableGenre:', refs.tableGenre);

  let allString = '';
  let genresString = '';

  global.genres.filter(function (el) {
    return global.selectFilm.genre_ids.find(function (item) {
      if (item === el.id) {
        console.log(11111, 'el.name:', el.name);
        el.name = el.name.toLowerCase();
        allString += ' '.concat(el.name, ',');
        genresString = allString.slice(0, -1);
      }
    });
  });
  // console.log('genresString:', genresString, genresString.length);
  // console.log('refs.tableGenre:', refs.tableGenre);
  // console.log('refs.detailsPage:', refs.detailsPage);

  const markupFilm = await cardTemplateFilm(selectFilm);
  refs.detailsPage.innerHTML = '';
  refs.detailsPage.insertAdjacentHTML('afterbegin', markupFilm);

  const tableGenreRef = document.querySelector('#js-table-genre');
  console.log('refs.tableGenreRef:', tableGenreRef);

  tableGenreRef.textContent = `${genresString}`;
  refs.detailsPage.appendChild(tableGenreRef);

  monitorButtonStatusText();
}

export { showDetails, toggleToQueue, toggleToWatched };
