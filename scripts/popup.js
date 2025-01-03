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
      document.addEventListener("click", (evento) => {
      if (evento.target.classList.contains("popup__change") ||
        evento.target === profilePopup){
        this.close()}

      if (evento.target.classList.contains("popup__change") ||
      evento.target === CardPopup){
        this.close()}

      if (evento.target.classList.contains("popup__change") ||
      evento.target === bigImage){
        this.close()}

      if (evento.target.classList.contains("popup__change") ||
      evento.target === avatarEditPopup){
        this.close()}

      if (evento.target.classList.contains("popup__change") ||
      evento.target === confirmationPopup){
        this.close()}
    })
  }

}

