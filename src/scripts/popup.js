import {
  profilePopup,
  CardPopup,
  bigImage,
  avatarEditPopup,
  confirmationPopup
} from "./utils.js";


export default class Popup {
  constructor(seletorPopup){
    this._popup = document.querySelector(seletorPopup)
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open(){
    this._popup.classList.add("popup__change");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close(){
    this._popup.classList.remove("popup__change");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(){
      document.addEventListener("click", (event) => {
      if (event.target.classList.contains("popup__change") ||
        event.target === profilePopup){
        this.close()}

      if (event.target.classList.contains("popup__change") ||
      event.target === CardPopup){
        this.close()}

      if (event.target.classList.contains("popup__change") ||
      event.target === bigImage){
        this.close()}

      if (event.target.classList.contains("popup__change") ||
      event.target === avatarEditPopup){
        this.close()}

      if (event.target.classList.contains("popup__change") ||
      event.target === confirmationPopup){
        this.close()}
    })
  }

}

