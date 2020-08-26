//* https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

const baseUrl = 'https://pixabay.com/api/';
export default {
  page: 1,
  query: '',
  async fetchImages() {
    const key = '?key=17627900-033e401422c15b0db6e889732';
    const type = '&image_type=photo';
    const orientation = '&orientation=horizontal';
    const requestParams = `&q=${this.query}&page=${this.page}&per_page=12`;

    try {
      let response = await fetch(
        baseUrl + key + type + orientation + requestParams,
      );
      let image = await response.json();
      let hits = await image.hits;
      this.incrementPage();

      return hits;
    } catch (error) {
      return error;
    }
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    //* делаем Мт. для пагинации
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
