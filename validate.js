
function checkValidity(event, config){
  const inputElement = event.target
      const messageElement = inputElement.nextElementSibling
      const disableButton = document.querySelector(config.submitButtonSelector)
      if (!inputElement.validity.valid){
        const errorMessage = inputElement.validationMessage
        messageElement.textContent = errorMessage
        messageElement.classList.add(config.messageErrorClass)
        inputElement.classList.add(config.inputErrorClass)

        disableButton.classList.add(config.inactiveButtonClass)
        disableButton.setAttribute('disabled', true)
      } else {
        messageElement.textContent = ""
        messageElement.classList.remove(config.messageErrorClass)
        inputElement.classList.remove(config.inputErrorClass)

        disableButton.classList.remove(config.inactiveButtonClass)
        disableButton.removeAttribute('disabled')
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
  submitButtonSelector: 'button',
  inactiveButtonClass: 'popup__button-error',
  inputErrorClass: 'popup__input-error',
  messageErrorClass: 'popup__message-error'
})
