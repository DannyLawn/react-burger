import { URL } from "./data";

class Api {
  constructor(url) {
    this.url = url
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }  

  getIngredients() {
    return this._request(`${this.url}/ingredients`, {
      method: "GET"
    });
  }

  getOrder(data) {
    return this._request(`${this.url}/orders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

const ingredientsApi = new Api(URL);

export { ingredientsApi };