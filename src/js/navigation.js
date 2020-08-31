import { renderFilms } from './initialHomePage';
import { showDetails, toggleToQueue, toggleToWatched } from './filmDetailsPage';

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

  /*   refs.prevButton.addEventListener('click', plaginationNavigation);  // Участник 2
  refs.nextButton.addEventListener('click', plaginationNavigation); */

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
  /*   refs.prevButton.removeEventListener('click', plaginationNavigation);  // Участник 2
  refs.nextButton.removeEventListener('click', plaginationNavigation); */
}

let selectFilm = {};

function activeDetailsPage(movie, itsLibraryFilm) {
  refs.sectionDetailsPage.classList.remove('visually-hidden');
  refs.sectionHomePage.classList.add('visually-hidden');
  refs.sectionLibraryPage.classList.add('visually-hidden');

  // console.log(renderFilms);
  // console.log(renderFilms.id);
  // const rendFilm = rendFilm.find(function (el) {
  //   console.log(el.id);
  //   console.log(movieId);
  //   return el.id === movieId;
  // });
  // console.log(rendFilm);
  // return rendFilm;
  // }

  if (itsLibraryFilm) {
    let queueFilmList = [
      ...JSON.parse(localStorage.getItem('filmsQueue')),
      ...JSON.parse(localStorage.getItem('filmsWatched')),
    ];
    selectFilm = queueFilmList.find(el => el.id === movie.id);
  }
  // console.log('movie navigation: ', movie);
  // console.log('movie.id navigation: ', movie.id);
  // console.log('renderFilms navigation: ', renderFilms);
  selectFilm = renderFilms.find(el => el.id === movie.id); // Участник 1
  // console.log('selectFilm navigation: ', selectFilm);
  showDetails(selectFilm);
  refs.addQueueButton.addEventListener('click', toggleToQueue); // Участник 4
  refs.addWatchedButton.addEventListener('click', toggleToWatched);
}

// refs.buttonLibraryQueue.removeEventListener('click', drawQueueFilmList); // Участник 5
// refs.buttonLibraryWatched.removeEventListener('click', drawWatchedFilmList);

// refs.prevButton.removeEventListener('click', plaginationNavigation); // Участник 2
// refs.nextButton.removeEventListener('click', plaginationNavigation);

export { activeDetailsPage, selectFilm };
