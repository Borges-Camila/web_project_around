export default class FormValidator {
  constructor({ config, formSelector }) {
    this._config = config;
    this._formSelector = formSelector;
  }

  _getForm() {
    const formElement = document.querySelector(this._formSelector);
    return formElement;
  }

  _addErrorMessage() {
    const errorMessage = this._input.validationMessage;
    this._messageElement.textContent = errorMessage;
    this._messageElement.classList.add(this._config.messageErrorClass);
    this._input.classList.add(this._config.inputErrorClass);
  }

  _removeErrorMessage() {
    this._messageElement.textContent = "";
    this._messageElement.classList.remove(this._config.messageErrorClass);
    this._input.classList.remove(this._config.inputErrorClass);
  }

  _disableButton() {
    this._whiteSaveButton.classList.add(this._config.inactiveButtonClass);
    this._whiteSaveButton.setAttribute("disabled", true);
  }

  _enableButton() {
    this._whiteSaveButton.classList.remove(this._config.inactiveButtonClass);
    this._whiteSaveButton.removeAttribute("disabled");
  }

  _checkValidity(event) {
    this._input = event.target;
    this._messageElement = this._input.nextElementSibling;

    if (!this._input.validity.valid) {
      this._addErrorMessage();
    } else {
      this._removeErrorMessage();
    }
  }

  // Função para verificar a validade dos campos imput do form

  _setEventListeners() {
    this._whiteSaveButton = this._form.querySelector(
      this._config.saveButtonSelector
    );
    this._disableButton();
    for (const input of this._inputs) {
      input.addEventListener("input", (event) => {
        this._checkValidity(event);
        if (
          this._inputs.some((input) => {
            return !input.validity.valid;
          })
        ) {
          this._disableButton();
        } else {
          this._enableButton();
        }
      });
    }
    if (
      this._inputs.some((input) => {
        return !input.validity.valid;
      })
    ) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  enableValidation() {
    this._form = this._getForm();
    this._inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._setEventListeners();
  }
}
