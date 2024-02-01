class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  updateUserData(newUserData, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  updateUserAvatar(newLink, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newLink
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization': `${token}`
      }
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  likeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `${token}`
      },
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  dislikeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`
      },
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  postNewCard(newImageData, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newImageData.name,
        link: newImageData.link
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/` + cardId, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

}

/******************** class *******************/
/* api */
const api = new Api({
  baseUrl: 'https://api.mesto-psv.nomoredomains.monster',
});

export default api;