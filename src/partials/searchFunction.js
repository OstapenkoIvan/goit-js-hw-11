import axios from 'axios';

const API_KEY = '29510729-da386a69ed783c050b927561b';
const SOURCE_URL = 'https://pixabay.com/api/';

export default class SearchObj {
  constructor() {
    this.searchValue = '';
    this.page = 1;
    this.perPage = 20;
    this.totalHits = 0;
  }

  async startSearch() {
    try {
      const response = await axios.get(`${SOURCE_URL}`, {
        params: {
          key: API_KEY,
          q: this.searchValue,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: this.page,
          per_page: this.perPage,
        },
      });
      const data = this.addTotalHits(response.data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  //   startSearch() {
  //     return (
  //       axios
  //         .get(`${SOURCE_URL}`, {
  //           params: {
  //             key: API_KEY,
  //             q: this.searchValue,
  //             image_type: 'photo',
  //             orientation: 'horizontal',
  //             safesearch: 'true',
  //             page: this.page,
  //             per_page: this.perPage,
  //           },
  //         })
  //         .then(response => this.addTotalHits(response.data))
  //         .catch(error => console.log(error))
  //     );
  //   }

  addTotalHits(data) {
    this.totalHits = data.totalHits;

    return data;
  }

  get value() {
    return this.searchValue;
  }

  set value(newValue) {
    this.searchValue = newValue;
  }

  setPage() {
    this.page = 1;
  }
  incresePage() {
    this.page += 1;
  }
}
