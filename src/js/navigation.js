const refs = {
  navHomeLink: document.querySelector('#js-navHomeLink'),
  navMyLibraryLink: document.querySelector('#js-navMyLibraryLink'),

  sectionHomePage: document.querySelector('#js-home-page'),
  sectionLibraryPage: document.querySelector('#js-library-page'),
  sectionDetailsPage: document.querySelector('#js-details-page'),

  buttonLibraryQueue: document.querySelector(
    '#js-navigation-library-btn-queue',
  ),
  buttonLibraryWatched: document.querySelector(
    '#js-navigation-library-btn-watched',
  ),

  addQueueButton: document.querySelector('#js-add-queue-button'),
  addWatchedButton: document.querySelector('#js-add-watched-button'),

  prevButton: document.querySelector('#js-prev-button'),
  nextButton: document.querySelector('#js-next-button'),

  logo: document.querySelector('#js-logo'),
};

let selectFilm = {};

refs.sectionLibraryPage.classList.add('visually-hidden');
refs.sectionDetailsPage.classList.add('visually-hidden');

refs.navHomeLink.addEventListener('click', onHomePage);
refs.navMyLibraryLink.addEventListener('click', onLibraryPage);
refs.logo.addEventListener('click', onHomePage);

function onHomePage() {
  refs.sectionHomePage.classList.remove('visually-hidden');
  refs.sectionLibraryPage.classList.add('visually-hidden');
  refs.sectionDetailsPage.classList.add('visually-hidden');

  refs.prevButton.addEventListener('click', plaginationNavigation);
  refs.nextButton.addEventListener('click', plaginationNavigation);

  refs.addQueueButton.removeEventListener('click', toggleToQueue);
  refs.addWatchedButton.removeEventListener('click', toggleToWatched);
  refs.buttonLibraryQueue.removeEventListener('click', drawQueueFilmList);
  refs.buttonLibraryWatched.removeEventListener('click', drawWatchedFilmList);
}

function onLibraryPage() {
  refs.onLibraryPagesectionHomePage.classList.add('visually-hidden');
  refs.sectionDetailsPage.classList.add('visually-hidden');
  refs.sectionLibraryPage.classList.remove('visually-hidden');

  drawQueueFilmList();
  refs.buttonLibraryQueue.classList.add('main__navigationLibraryButtonActive');

  refs.buttonLibraryQueue.addEventListener('click', drawQueueFilmList);
  refs.buttonLibraryWatched.addEventListener('click', drawWatchedFilmList);

  refs.addQueueButton.removeEventListener('click', toggleToQueue);
  refs.addWatchedButton.removeEventListener('click', toggleToWatched);

  refs.prevButton.removeEventListener('click', plaginationNavigation);
  refs.nextButton.removeEventListener('click', plaginationNavigation);
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  refs.sectionHomePage.classList.add('visually-hidden');
  refs.sectionLibraryPage.classList.add('visually-hidden');
  refs.sectionDetailsPage.classList.remove('visually-hidden');

  if (itsLibraryFilm) {
    let queueAndWatchedFilmListFromLS = [
      ...JSON.parse(localStorage.getItem('filmsQueue')),
      ...JSON.parse(localStorage.getItem('filmsWatched')),
    ];

    selectFilm = queueAndWatchedFilmListFromLS.find(el => el.id === movieId);
  }

  selectFilm = renderFilms.find(el => el.id === movieId);
}

showDetails(selectFilm);

refs.addQueueButton.addEventListener('click', toggleToQueue);
refs.addWatchedButton.addEventListener('click', toggleToWatched);

refs.buttonLibraryQueue.removeEventListener('click', drawQueueFilmList);
refs.buttonLibraryWatched.removeEventListener('click', drawWatchedFilmList);

refs.prevButton.removeEventListener('click', plaginationNavigation);
refs.nextButton.removeEventListener('click', plaginationNavigation);
