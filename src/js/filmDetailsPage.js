// Участник №04

// - пишем функцию monitorButtonStatusText которая следит за состоянием (значок и текст в кнопке),
// читает  local storage по ключу filmsQueue и  filmsWatched и меняет текст и значки в кнопках: Delete from queue / Add to queue;
// Delete from watched / Add to watched.

// - пишем функцию toggleToQueue (будет добавлять или удалять фильмы из очереди просмотра),
// которая создает переменную массива в очереди, читает local storage по ключу filmsQueue, если результат не пустой,
// то пушит элементы в нашу переменную, ! также функция вплотную работает с глобальной переменной selectFilm,
// и если selectFilm содержиться в нашей переменной, то убираем его оттуда,
// иначе добавляем selectFilm в нашу переменную, потом эта функция кладет нашу переменную в local storage,
// запускает в конце себя функцию monitorButtonStatusText;

// - пишем функцию toggleToWatched (будет добавлять или удалять фильмы из просмотренных), суть ее работы один в один как toggleToQueue,
// только работает с local storage по ключу filmsWatched.

// - пишем функцию showDetails которая принимает параметром selectFilm (глобальная переменная - объект, которая создана в задаче номер три)
// и рендерит всю разметку согласно макета, в этой функции запускается функция monitorButtonStatusText.

// * из DOM достукивается до нужных кнопок участник 3 и вешает функции  toggleToQueue и toggleToWatched слушателями на страницу деталей
// и удаляет там где не нужно.

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

  if (filmsFromQueueLS !== null) {
    JSON.parse(filmsFromQueueLS).find(ar => ar.id === selectFilm)
      ? (refs.addQueueButton.textContent = 'Delete from queue')
      : (refs.addQueueButton.textContent = 'Add to queue');
  }
  refs.addQueueButton.textContent = 'Add to queue';

  if (filmsFromWatchedLS !== null) {
    JSON.parse(filmsFromWatchedLS).find(ar => ar.id === selectFilm)
      ? (refs.addWatchedButton.textContent = 'Delete from queue')
      : (refs.addWatchedButton.textContent = 'Add to queue');
  }
  refs.addWatchedButton.textContent = 'Add to watched';
}

function toggleToQueue() {
  let arr = [];
  let arrNew = [];
  const filmsQueueLS = getItem('filmsQueue');
  if (filmsQueueLS !== null) {
    arr.push(JSON.parse(filmsQueueLS));
  }
  if (arr.find(ar => ar.id === selectFilm)) {
    arrNew = arr.filter(ar => ar.id !== selectFilm);
  }
  arrNew.push(selectFilm);
  localStorage.setItem('filmsQueue', JSON.stringify(arrNew));
  monitorButtonStatusText();
}

function toggleToWatched() {
  let arr = [];
  let arrNew = [];
  const filmsWatchedLS = getItem('filmsWatched');
  if (filmsWatchedLS !== null) {
    arr.push(JSON.parse(filmsWatchedLS));
  }
  if (arr.find(ar => ar.id === selectFilm)) {
    arrNew = arr.filter(ar => ar.id !== selectFilm);
  }
  arrNew.push(selectFilm);
  localStorage.setItem('filmsWatched', JSON.stringify(arrNew));
  monitorButtonStatusText();
}

function showDetails(selectFilm) {
  refs.mainImg.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w500/${selectFilm.poster}`,
  );
  refs.descriptionTitle.textContent = selectFilm.title;
  refs.tableVote.textContent = selectFilm.vote_average / selectFilm.vote_count;
  refs.tablePopularity.textContent = selectFilm.popularity;
  refs.tableOriginalTitle.textContent = selectFilm.original_title;
  refs.tableGenre.textContent = selectFilm.genre;
  refs.descriptionAboutInfo = selectFilm.overview;
  monitorButtonStatusText();
}
