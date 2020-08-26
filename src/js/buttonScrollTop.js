let scrollElement = document.querySelector('#scrollTtop-button');

window.onscroll = function () {
  if (
    document.documentElement.scrollTop > document.documentElement.clientHeight
  ) {
    scrollElement.classList.remove('is-hidden');
  } else {
    scrollElement.classList.add('is-hidden');
  }
};

scrollElement.addEventListener('click', goToUp);

function goToUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
