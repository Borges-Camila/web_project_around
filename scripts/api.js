export default class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUsersInfo(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
  }


  editProfileInfo({name, about}){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
  })
  }

  getInitialCards(){
    return fetch(`${this._baseUrl}/cards`, {
       headers: this._headers,
     })
  }

  createNewCard(card){
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(card)
  })
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  addLikes(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
  }

  removeLikes(cardId){
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  editAvatarImg({ avatar }){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar }),
    })
  }

}
