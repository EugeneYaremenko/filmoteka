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

refs.sectionLibraryPage.classList.add('visually-hidden');
refs.sectionDetailsPage.classList.add('visually-hidden');

refs.navHomeLink.addEventListener('click', activeHomePage);
refs.navMyLibraryLink.addEventListener('click', activeLibraryPage);
refs.logo.addEventListener('click', activeHomePage);

function activeHomePage() {
  refs.sectionHomePage.classList.remove('visually-hidden');
  refs.sectionLibraryPage.classList.add('visually-hidden');
  refs.sectionDetailsPage.classList.add('visually-hidden');

/*   refs.prevButton.addEventListener('click', plaginationNavigation);  // Участник 2
  refs.nextButton.addEventListener('click', plaginationNavigation); */

/*   refs.addQueueButton.removeEventListener('click', toggleToQueue);        // Участник 4
  refs.addWatchedButton.removeEventListener('click', toggleToWatched); */

/*   refs.buttonLibraryQueue.removeEventListener('click', drawQueueFilmList);     // Участник 5
  refs.buttonLibraryWatched.removeEventListener('click', drawWatchedFilmList); */
}

function activeLibraryPage() {
  refs.sectionHomePage.classList.add('visually-hidden');
  refs.sectionDetailsPage.classList.add('visually-hidden');
  refs.sectionLibraryPage.classList.remove('visually-hidden');

/*   drawQueueFilmList();
  refs.buttonLibraryQueue.classList.add('main__navigation-library-btn-active'); */   // Участник 5

/*   refs.buttonLibraryQueue.addEventListener('click', drawQueueFilmList);      // Участник 5
  refs.buttonLibraryWatched.addEventListener('click', drawWatchedFilmList); */

/*   refs.addQueueButton.removeEventListener('click', toggleToQueue);       // Участник 4
  refs.addWatchedButton.removeEventListener('click', toggleToWatched); */

/*   refs.prevButton.removeEventListener('click', plaginationNavigation);  // Участник 2
  refs.nextButton.removeEventListener('click', plaginationNavigation); */
}

let selectFilm = {};

function activeDetailsPage(movieId, itsLibraryFilm) {
  refs.sectionHomePage.classList.add('visually-hidden');
  refs.sectionLibraryPage.classList.add('visually-hidden');
  refs.sectionDetailsPage.classList.remove('visually-hidden');

  if (itsLibraryFilm) {
    let queueFilmList = [
      ...JSON.parse(localStorage.getItem('filmsQueue')),
      ...JSON.parse(localStorage.getItem('filmsWatched')),
    ];

    selectFilm = queueFilmList.find(el => el.id === movieId);
  }

  selectFilm = renderFilms.find(el => el.id === movieId);   // Участник 1

  /* showDetails(selectFilm); */  // Участник 4
}



/* refs.addQueueButton.addEventListener('click', toggleToQueue);          // Участник 4
refs.addWatchedButton.addEventListener('click', toggleToWatched); */

/* refs.buttonLibraryQueue.removeEventListener('click', drawQueueFilmList);   // Участник 5
refs.buttonLibraryWatched.removeEventListener('click', drawWatchedFilmList); */

/* refs.prevButton.removeEventListener('click', plaginationNavigation);   // Участник 2
refs.nextButton.removeEventListener('click', plaginationNavigation); */
