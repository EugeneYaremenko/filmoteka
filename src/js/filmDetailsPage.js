// Участник №04

import { selectFilm } from './navigation';

const refs = {
  mainImg: document.querySelector('#js-mainImg'),
  descriptionTitle: document.querySelector('#js-descriptionTitle'),
  tableVote: document.querySelector('.js-tableVote'),
  tablePopularity: document.querySelector('.js-tablePopularity'),
  tableOriginalTitle: document.querySelector('.js-tableOriginalTitle'),
  tableGenre: document.querySelector('.js-tableGenre'),
  descriptionAboutInfo: document.querySelector('#js-descriptionAboutInfo'),
  addQueueButton: document.querySelector('#js-addQueueButton'),
  addWatchedButton: document.querySelector('#js-addWatchedButton'),
};

function monitorButtonStatusText() {
  let filmsFromQueueLS = localStorage.getItem('filmsQueue');
  let filmsFromWatchedLS = localStorage.getItem('filmsWatched');

  // console.log('filmsFromQueueLS in BUTTON STATUS: ', filmsFromQueueLS);

  if (filmsFromQueueLS !== null) {
    JSON.parse(filmsFromQueueLS).find(ar => ar.id === selectFilm.id)
      ? (refs.addQueueButton.textContent = 'Delete from queue')
      : (refs.addQueueButton.textContent = 'Add to queue');
  } else refs.addQueueButton.textContent = 'Add to queue';

  if (filmsFromWatchedLS !== null) {
    JSON.parse(filmsFromWatchedLS).find(ar => ar.id === selectFilm.id)
      ? (refs.addWatchedButton.textContent = 'Delete from watched')
      : (refs.addWatchedButton.textContent = 'Add to watched');
  } else refs.addWatchedButton.textContent = 'Add to watched';
}

let arrQ = [];
let arrW = [];

function toggleToQueue() {
  const filmsQueueLS = JSON.parse(localStorage.getItem('filmsQueue'));
  if (filmsQueueLS === null) {
    arrQ.push(selectFilm);
    localStorage.setItem('filmsQueue', JSON.stringify(arrQ));
    monitorButtonStatusText();
    return;
  }
  if (filmsQueueLS !== null && arrQ.includes(selectFilm)) {
    let arrQ2 = arrQ.filter(ar => {
      return ar.id !== selectFilm.id;
    });
    localStorage.setItem('filmsQueue', JSON.stringify(arrQ2));
    arrQ = arrQ2;
    monitorButtonStatusText();
    return;
  }
  arrQ.push(selectFilm);
  localStorage.setItem('filmsQueue', JSON.stringify(arrQ));
  monitorButtonStatusText();
}

// function toggleToQueue() {
//   let filmsQueueLS = JSON.parse(localStorage.getItem('filmsQueue'));
//   if (filmsQueueLS !== null) {
//     let arFind = arrQ.find(function (ar, selectFilm) {
//       return ar.id === selectFilm.id;
//     });
//     console.log('arFind: ', arFind);
//     if (arFind) {
//       let arrFilter = arrQ.filter(ar => ar.id !== selectFilm.id);
//       localStorage.setItem('filmsQueue', JSON.stringify(arrFilter));
//       return;
//     }
//     arrQ.push(selectFilm);
//     console.log('arrQ if !== null: ', arrQ);
//     localStorage.setItem('filmsQueue', JSON.stringify(arrQ));
//     monitorButtonStatusText();
//     return;
//   }
//   console.log('selectFilm: ', selectFilm);
//   arrQ.push(selectFilm);
//   console.log('arrQ after push selectFilm: ', arrQ);
//   localStorage.setItem('filmsQueue', JSON.stringify(arrQ));
//   monitorButtonStatusText();
// }

function toggleToWatched() {
  const filmsWatchedLS = JSON.parse(localStorage.getItem('filmsWatched'));
  console.log('filmsWatchedLS BEGIN: ', filmsWatchedLS);
  if (filmsWatchedLS === null) {
    arrW.push(selectFilm);
    localStorage.setItem('filmsWatched', JSON.stringify(arrW));
    monitorButtonStatusText();
    return;
  }
  if (filmsWatchedLS !== null && arrW.includes(selectFilm)) {
    let arrW2 = arrW.filter(ar => {
      return ar.id !== selectFilm.id;
    });
    localStorage.setItem('filmsWatched', JSON.stringify(arrW2));
    arrW = arrW2;
    monitorButtonStatusText();
    return;
  }
  arrW.push(selectFilm);
  localStorage.setItem('filmsWatched', JSON.stringify(arrW));
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  // console.log('selectFilm showDetails: ', selectFilm);
  refs.mainImg.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w500/${selectFilm.poster_path}`,
  );
  refs.descriptionTitle.textContent = selectFilm.title;
  refs.tableVote.textContent = `${selectFilm.vote_average} / ${selectFilm.vote_count}`;
  refs.tablePopularity.textContent = selectFilm.popularity;
  refs.tableOriginalTitle.textContent = selectFilm.original_title;
  refs.tableGenre.textContent = selectFilm.genre_ids;
  refs.descriptionAboutInfo.textContent = selectFilm.overview;
  monitorButtonStatusText();
}

export { showDetails, toggleToQueue, toggleToWatched };
