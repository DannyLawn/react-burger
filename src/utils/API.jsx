import { URL } from "./data";

class Api {
  constructor(url) {
    this.url = url
  }

  _checkResponce(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getIngredients() {
    return fetch(`${this.url}/ingredients`).then(this._checkResponce);
  }
}

const ingredientsApi = new Api(URL);

export { ingredientsApi };