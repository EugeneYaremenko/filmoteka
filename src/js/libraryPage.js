let buttonLibraryQueue = document.querySelector(
  '#js-navigation-library-btn-queue',
);

let buttonLibraryWatched = document.querySelector(
  '#js-navigation-library-btn-watched',
);

let libraryFilmList = document.querySelector('#js-library-film-list');

function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
  const createListItem = ({ imgPath, filmTitle, movieId, voteAverage }) =>
    `<li class="main__film-item js-film-item">
        <div class="main__film-item-wrapper js-film-item-wrapper">
          <a class="main__film-link js-film-link">
            <img alt="${filmTitle}" src="https://image.tmdb.org/t/p/w500/${imgPath}" class="main__film-image js-film-image">
          </a>
        </div>

        <span class="main__library-film-list-title">${filmTitle}</span>
        <span class="main__library-film-list-popularity">Popularity: ${voteAverage}</span>
    </li>`;

  const listItemMarkup = images.reduce(
    (acc, item) => acc + createListItem(item),
    '',
  );

  libraryFilmList.insertAdjacentHTML('afterbegin', listItemMarkup);

  listItem.addEventListener('click', () => activeDetailsPage(movieId, true));

  return libraryFilmList;
}

function drawQueueFilmList() {
  let fragment = document.createDocumentFragment();
  let filmsQueueLocalStorage = localStorage.getItem('filmsQueue');
  let parseLocalStorage = JSON.parse(filmsQueueLocalStorage);

  if (filmsQueueLocalStorage !== null && parseLocalStorage.length !== 0) {
    parseLocalStorage.forEach(film => {
      fragment.append(
        createLibraryCardFunc(
          film.backdrop_path,
          film.title,
          film.id,
          film.vote_average,
        ),
      );
    });

    libraryFilmList.innerHTML = '';
    libraryFilmList.append(fragment);
  }

  if (filmsQueueLocalStorage === null || parseLocalStorage.length === 0) {
    libraryFilmList.innerHTML = '';

    const emptyLibrary =
      '<li class="empty">You do not have to queue movies to watch. Add them.</li>';

    libraryFilmList.insertAdjacentHTML('afterbegin', emptyLibrary);
  }

  buttonLibraryQueue.classList.add('main__navigation-library-btn-active');
  buttonLibraryWatched.classList.remove('main__navigation-library-btn-active');
}

function drawWatchedFilmList() {
  let fragment = document.createDocumentFragment();
  let filmsWatchedLocalStorage = localStorage.getItem('filmsWatched');
  let parseLocalStorage = JSON.parse(filmsWatchedLocalStorage);

  if (filmsWatchedLocalStorage !== null && parseLocalStorage.length !== 0) {
    parseLocalStorage.forEach(film => {
      fragment.append(
        createLibraryCardFunc(
          film.backdrop_path,
          film.title,
          film.id,
          film.vote_average,
        ),
      );
    });
    libraryFilmList.innerHTML = '';
    libraryFilmList.append(fragment);
  }

  if (filmsWatchedLocalStorage === null || parseLocalStorage.length === 0) {
    libraryFilmList.innerHTML = '';

    const emptyLibrary =
      '<li class="empty">You do not have watched movies. Add them.</li>';

    libraryFilmList.insertAdjacentHTML('afterbegin', emptyLibrary);
  }
  buttonLibraryQueue.classList.remove('main__navigation-library-btn-active');
  buttonLibraryWatched.classList.add('main__navigation-library-btn-active');
}

export { drawQueueFilmList, drawWatchedFilmList };
