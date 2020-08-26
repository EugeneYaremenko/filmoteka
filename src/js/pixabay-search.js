import pixabayService from './services/pixabayAsync-services';
import spinner from './spinner';
import galleryTemplate from '../templates/photoGallery.hbs';
import { noticeError, mySuccess } from './services/notices';

var InfiniteScroll = require('infinite-scroll');
let throttle = require('lodash.throttle');
const _ = require('lodash');

const refs = {
  containerGallery: document.querySelector('.wrapper'),
  sectionGallery: document.querySelector('.section-gallery'),

  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('#gallery-list'),
  galleryItem: document.querySelector('.gallery__item'),
  searchImageBtn: document.querySelector('button[data-action="search-image"]'),
  clearImageBtn: document.querySelector('button[data-action="clear-image"]'),
  loadMoreBtn: document.querySelector('button[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.clearImageBtn.addEventListener('click', clearListItems);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function searchFormSubmitHandler(event) {
  event.preventDefault();
  spinner.show();

  const form = event.currentTarget;
  const input = form.elements.query;

  clearListItems();

  pixabayService.resetPage();
  pixabayService.searchQuery = input.value;

  fetchImages();

  document.addEventListener('scroll', _.throttle(infiniteScroll, 300));

  input.value = '';
}

function loadMoreBtnHandler() {
  spinner.show();
  fetchImages();
  goToUp();
}

function goToUp() {
  const element = refs.galleryList.lastElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    inline: 'center',
  });
}

function infiniteScroll() {
  function getLastElementValue() {
    let lastElement = refs.galleryList.getElementsByClassName('gallery__item');
    return lastElement.length;
  }

  function loadMore() {
    let lastItem = getLastElementValue();

    while (true) {
      let windowRelativeBottom = document.documentElement.getBoundingClientRect()
        .bottom;
      let clientHeight = document.documentElement.clientHeight;

      if (windowRelativeBottom > clientHeight + 10) break;
      {
        fetchImages();

        if (lastItem) break;
        {
          loadMore();
        }
      }
    }
  }

  loadMore();
}

function fetchImages() {
  spinner.show();

  pixabayService
    .fetchImages()
    .then(hits => {
      if (hits.length === 0) {
        spinner.hide();
        return noticeError();
      } else {
        spinner.hide();
        insertListItems(hits);
        mySuccess();
      }
    })
    .catch(error => {
      noticeError();
      console.warn(error);
    });
}

async function insertListItems(images) {
  const markupGallery = await galleryTemplate(images);
  refs.galleryList.insertAdjacentHTML('beforeend', markupGallery);
}

function clearListItems() {
  refs.galleryList.innerHTML = '';
}
