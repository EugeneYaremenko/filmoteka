import global from './constants';
import { showDetails, toggleToQueue, toggleToWatched } from './filmDetailsPage';
import { drawQueueFilmList, drawWatchedFilmList } from './libraryPage';
import { plaginationNavigation } from './searchAndPlaginationHomePage';
import { fetchPopularMoviesList } from './initialHomePage';

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
  addQueueButton: document.querySelector('#js-addQueueButton'),
  addWatchedButton: document.querySelector('#js-addWatchedButton'),
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
  refs.addQueueButton.removeEventListener('click', toggleToQueue); // Участник 4
  refs.addWatchedButton.removeEventListener('click', toggleToWatched);
  refs.buttonLibraryQueue.removeEventListener('click', drawQueueFilmList); // Участник 5
  refs.buttonLibraryWatched.removeEventListener('click', drawWatchedFilmList);
}

function activeLibraryPage() {
  refs.sectionLibraryPage.classList.remove('visually-hidden');
  refs.sectionHomePage.classList.add('visually-hidden');
  refs.sectionDetailsPage.classList.add('visually-hidden');
  drawQueueFilmList();
  refs.buttonLibraryQueue.classList.add('main__navigation-library-btn-active'); // Участник 5
  refs.buttonLibraryQueue.addEventListener('click', drawQueueFilmList); // Участник 5
  refs.buttonLibraryWatched.addEventListener('click', drawWatchedFilmList);
  refs.addQueueButton.removeEventListener('click', toggleToQueue); // Участник 4
  refs.addWatchedButton.removeEventListener('click', toggleToWatched);
  refs.prevButton.removeEventListener('click', plaginationNavigation); // Участник 2
  refs.nextButton.removeEventListener('click', plaginationNavigation);
}

function activeDetailsPage(movieId, itsLibraryFilm) {
  refs.sectionDetailsPage.classList.remove('visually-hidden');
  refs.sectionHomePage.classList.add('visually-hidden');
  refs.sectionLibraryPage.classList.add('visually-hidden');
  if (itsLibraryFilm) {
    let queueFilmListlocalStorage = [
      ...JSON.parse(localStorage.getItem('filmsQueue')),
      ...JSON.parse(localStorage.getItem('filmsWatched')),
    ];
    global.selectFilm = queueFilmListlocalStorage.find(el => el.id === movieId);
    console.log(
      'global.selectFilm activeDetailsPage in Library',
      global.selectFilm,
    );
  }
  global.selectFilm = global.renderFilms.find(el => el.id === movieId); // Участник 1
  showDetails(global.selectFilm);
  refs.addQueueButton.addEventListener('click', toggleToQueue); // Участник 4
  refs.addWatchedButton.addEventListener('click', toggleToWatched);
}

refs.buttonLibraryQueue.removeEventListener('click', drawQueueFilmList); // Участник 5
refs.buttonLibraryWatched.removeEventListener('click', drawWatchedFilmList);
refs.prevButton.removeEventListener('click', plaginationNavigation); // Участник 2
refs.nextButton.removeEventListener('click', plaginationNavigation);

export { activeDetailsPage };
