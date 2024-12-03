export default class FormValidator {
  constructor({config, formSelector}){
    this._config = config
    this._formSelector = formSelector
  }

  _getForm(){
    const formElement = document.querySelector(this._formSelector)
    return formElement
  }

  _addErrorMessage() {
    const errorMessage = this._input.validationMessage
    this._messageElement.textContent = errorMessage
    this._messageElement.classList.add(this._config.messageErrorClass)
    this._input.classList.add(this._config.inputErrorClass)
  }

  _removeErrorMessage() {
    this._messageElement.textContent = ""
    this._messageElement.classList.remove(this._config.messageErrorClass)
    this._input.classList.remove(this._config.inputErrorClass)
  }

  _disableButton(){
    this._whiteSaveButton.classList.add(this._config.inactiveButtonClass)
    this._whiteSaveButton.setAttribute('disabled', true)
    this._whiteCreateButton.classList.add(this._config.inactiveButtonClass)
    this._whiteCreateButton.setAttribute('disabled', true)
  }

  _enableButton(){
    this._whiteSaveButton.classList.remove(this._config.inactiveButtonClass)
    this._whiteSaveButton.removeAttribute('disabled')
    this._whiteCreateButton.classList.remove(this._config.inactiveButtonClass)
    this._whiteCreateButton.removeAttribute('disabled')
  }


  _checkValidity(event){
    this._input = event.target
    this._messageElement = this._input.nextElementSibling
    this._whiteSaveButton = this._form.querySelector(this._config .saveButtonSelector)
    this._whiteCreateButton = this._form.querySelector(this._config .createuttonSelector)

        if (!this._input.validity.valid){
          this._addErrorMessage()
          this._disableButton()

        } else {
          this._removeErrorMessage()
          this._enableButton()
        }
  }

  _setEventListeners(){
  for (const input of this._inputs) {
        input.addEventListener('input', (event) => {
          this._checkValidity(event)
        })
    }}


  enableValidation(){
    this._form = this._getForm()
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    this._setEventListeners()
  }

}