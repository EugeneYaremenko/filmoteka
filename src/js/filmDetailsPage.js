// Участник №04

// import { selectFilm } from './navigation';
import global from './constants';
import cardTemplateFilm from '../templates/cardTemplateFilm.hbs';

const refs = {
  detailsPage: document.querySelector('#js-details-page-wrapper'),

  // mainImg: document.querySelector('#js-mainImg'),
  // descriptionTitle: document.querySelector('#js-descriptionTitle'),
  // tableVote: document.querySelector('.js-tableVote'),
  // tablePopularity: document.querySelector('.js-tablePopularity'),
  // tableOriginalTitle: document.querySelector('.js-tableOriginalTitle'),
  tableGenre: document.querySelector('.js-tableGenre'),
  // descriptionAboutInfo: document.querySelector('#js-descriptionAboutInfo'),
  addQueueButton: document.querySelector('#js-addQueueButton'),
  addWatchedButton: document.querySelector('#js-addWatchedButton'),
};

function monitorButtonStatusText() {
  let filmsFromQueueLS = JSON.parse(localStorage.getItem('filmsQueue'));
  let filmsFromWatchedLS = JSON.parse(localStorage.getItem('filmsWatched'));

  if (filmsFromQueueLS !== null) {
    filmsFromQueueLS.find(ar => ar.id === global.selectFilm.id)
      ? (refs.addQueueButton.textContent = 'Delete from queue')
      : (refs.addQueueButton.textContent = 'Add to queue');
  } else refs.addQueueButton.textContent = 'Add to queue';

  if (filmsFromWatchedLS !== null) {
    filmsFromWatchedLS.find(ar => ar.id === global.selectFilm.id)
      ? (refs.addWatchedButton.textContent = 'Delete from watched')
      : (refs.addWatchedButton.textContent = 'Add to watched');
  } else refs.addWatchedButton.textContent = 'Add to watched';
}

let arrQ = [];

function toggleToQueue() {
  const filmsQueueLS = JSON.parse(localStorage.getItem('filmsQueue'));
  if (filmsQueueLS === null || filmsQueueLS == 0) {
    localStorage.setItem('filmsQueue', JSON.stringify([global.selectFilm]));
    monitorButtonStatusText();
    return;
  }
  if (filmsQueueLS !== null) {
    arrQ.push(...filmsQueueLS);
    if (arrQ.find(arW => arW.id == global.selectFilm.id)) {
      let arrQ2 = arrQ.filter(ar => {
        return ar.id !== global.selectFilm.id;
      });
      localStorage.setItem('filmsQueue', JSON.stringify(arrQ2));
      arrQ.length = 0;
      monitorButtonStatusText();
      return;
    } else {
      arrQ.push(global.selectFilm);
      localStorage.setItem('filmsQueue', JSON.stringify(arrQ));
      monitorButtonStatusText();
      arrQ.length = 0;
      return;
    }
  }
}

let arrW = [];

function toggleToWatched() {
  const filmsWatchedLS = JSON.parse(localStorage.getItem('filmsWatched'));
  if (filmsWatchedLS === null || filmsWatchedLS == 0) {
    localStorage.setItem('filmsWatched', JSON.stringify([global.selectFilm]));
    monitorButtonStatusText();
    return;
  }
  if (filmsWatchedLS !== null) {
    arrW.push(...filmsWatchedLS);
    if (arrW.find(arW => arW.id == global.selectFilm.id)) {
      let arrW2 = arrW.filter(ar => {
        return ar.id !== global.selectFilm.id;
      });
      localStorage.setItem('filmsWatched', JSON.stringify(arrW2));
      arrW.length = 0;
      monitorButtonStatusText();
      return;
    } else {
      arrW.push(global.selectFilm);
      localStorage.setItem('filmsWatched', JSON.stringify(arrW));
      monitorButtonStatusText();
      arrW.length = 0;
      return;
    }
  }
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

  const markupFilm = await cardTemplateFilm(selectFilm);
  refs.detailsPage.innerHTML = '';
  refs.detailsPage.insertAdjacentHTML('afterbegin', markupFilm);
  // refs.detailsPage.insertAdjacentHTML('beforeend', markupFilm);

  monitorButtonStatusText();
}

export { showDetails, toggleToQueue, toggleToWatched };
