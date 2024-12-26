import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(seletorPopup, handleFormSubmit){
    super(seletorPopup);
    this._handleFormSubmit = handleFormSubmit;
    console.log(this._popup)
    this._form = this._popup.querySelector(".popup__form-table");
    console.log(this._form)
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }


  _getInputValues(){
    const input = this._form.querySelectorAll(".popup__input");
    const inputValue = {};
    input.forEach((input) => {
      inputValue[input.name] = input.value;
    });
    return inputValue;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
  }
}