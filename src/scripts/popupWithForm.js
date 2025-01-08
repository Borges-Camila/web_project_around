import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(seletorPopup, handleFormSubmit) {
    super(seletorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form-table");
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._saveButton = this._form.querySelector(".popup__save-button");
  }

  _getInputValues() {
    const input = this._form.querySelectorAll(".popup__input");
    const inputValue = {};
    input.forEach((input) => {
      inputValue[input.name] = input.value;
    });
    return inputValue;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Salvando...";
    }
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._renderLoading(true);
    });
  }

  close() {
    super.close();
    this._saveButton.textContent = "Salvar";
  }
}
