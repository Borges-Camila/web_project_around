export default class UserInfo {
  constructor({name, about, img}){
    this._name = document.querySelector(name)
    this._about = document.querySelector(about)
    this._img = document.querySelector(img)
  }

  getUserInfo(){
    return{
      name: this._name.textContent,
      about: this._about.textContent,
      img: this._img.src
    }
  }

  setUserInfo(name, about, img){
    this._name.textContent = name;
    this._about.textContent = about;
    this._img.src = img;
  }
}
