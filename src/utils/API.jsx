import { URL } from "./data";

class Api {
  constructor(url) {
    this.url = url
  }

  _checkResponse(res) {
    return res.ok ? res.json() : res.json().then((data) => Promise.reject(data));
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getIngredients() {
    return this._request(`${this.url}/ingredients`, {
      method: "GET"
    })
  }

  postOrder(data) {
    return this._request(`${this.url}/orders`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

  requestPasswordReset(email) {
    return this._request(`${this.url}/password-reset`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
  }

  resetPassword(password, token) {
    return this._request(`${this.url}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    })
  }
}

const currentApi = new Api(URL);

export { currentApi };