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

  register(email, password, name) {
    return this._request(`${this.url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, password, name })
    })
  }

  logIn(email, password) {
    return this._request(`${this.url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
  }

  logOut(token) {
    return this._request(`${this.url}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json" 
      },
      body: JSON.stringify({ token })
    })
  }

  refreshToken(token) {
    return this._request(`${this.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ token })
    })
  }

  getUserData(token) {
    return this._request(`${this.url}/auth/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      }
    })
  }

  upgradeUserData( token, email, password, name) {
    return this._request(`${this.url}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ email, password, name })
    }) 
  }
  
  // requestPasswordReset(email) {
  //   return this._request(`${this.url}/password-reset`, {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email })
  //   })
  // }

  // resetPassword(password, token) {
  //   return this._request(`${this.url}/password-reset/reset`, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ password, token }),
  //   })
  // }
}

const currentApi = new Api(URL);

export { currentApi };