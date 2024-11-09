
function addErrorMessage(input, messageElement, config) {
  const errorMessage = input.validationMessage
  messageElement.textContent = errorMessage
  messageElement.classList.add(config.messageErrorClass)
  input.classList.add(config.inputErrorClass)
}

function removeErrorMessage(input, messageElement, config) {
  messageElement.textContent = ""
  messageElement.classList.remove(config.messageErrorClass)
  input.classList.remove(config.inputErrorClass)
}

function disableButton(whiteSaveButton, whiteCreateButton, config){
  whiteSaveButton.classList.add(config.inactiveButtonClass)
  whiteSaveButton.setAttribute('disabled', true)
  whiteCreateButton.classList.add(config.inactiveButtonClass)
  whiteCreateButton.setAttribute('disabled', true)
}

function enableButton(whiteSaveButton, whiteCreateButton, config){
  whiteSaveButton.classList.remove(config.inactiveButtonClass)
  whiteSaveButton.removeAttribute('disabled')
  whiteCreateButton.classList.remove(config.inactiveButtonClass)
  whiteCreateButton.removeAttribute('disabled')
}

function checkValidity(event, config){
  const inputElement = event.target
  const messageElement = inputElement.nextElementSibling
  const whiteSaveButton = document.querySelector(config.saveButtonSelector)
  const whiteCreateButton = document.querySelector(config.createuttonSelector)

      if (!inputElement.validity.valid){
        addErrorMessage(inputElement, messageElement, config)
        disableButton(whiteSaveButton, whiteCreateButton, config)

      } else {
        removeErrorMessage(inputElement, messageElement, config)
        enableButton(whiteSaveButton, whiteCreateButton, config)
      }
}

function enableValidation(config){
  const forms = Array.from(document.querySelectorAll(config.formSelector))

  for (const form of forms) {
    const inputs = Array.from(document.querySelectorAll(config.inputSelector))
    for (const input of inputs) {
      input.addEventListener('input', (event) => {
        checkValidity(event, config)
      })
  }
}
}

enableValidation({
  formSelector: 'form',
  inputSelector: 'input',
  saveButtonSelector: '.popup__save-button',
  createuttonSelector: '#create-button',
  inactiveButtonClass: 'popup__button-error',
  inputErrorClass: 'popup__input-error',
  messageErrorClass: 'popup__message-error'
})
