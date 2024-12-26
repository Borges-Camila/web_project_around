// ----------------------- IMPORT JS -------------------------
import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import UserInfo from "./userInfo.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";
import {
  editButton,
  closeButton,
  indexName,
  indexAbout,
  saveButton,
  addButton,
  closeBtnCardPopup,
  indexTitle,
  indexLink,
  containerCard,
  createButton,
  initialCards,
  buttonCloseImage
} from "./utils.js";

// --------------------- VALIDAÇÃO ---------------------------
new FormValidator({
  config: {
    formSelector: 'form',
    inputSelector: 'input',
    saveButtonSelector: '.popup__save-button',
    createuttonSelector: '#create-button',
    inactiveButtonClass: 'popup__button-error',
    inputErrorClass: 'popup__input-error',
    messageErrorClass: 'popup__message-error'
  },
  formSelector: "#profile-form"
}).enableValidation()


new FormValidator({
  config: {
    formSelector: 'form',
    inputSelector: 'input',
    saveButtonSelector: '.popup__save-button',
    createuttonSelector: '#create-button',
    inactiveButtonClass: 'popup__button-error',
    inputErrorClass: 'popup__input-error',
    messageErrorClass: 'popup__message-error'
  },
  formSelector: "#card-form"
}).enableValidation()


// ------------------------------------ PROFILE POPUP ------------------------------------------

// ----- ALTERAÇÃO DE PROFILE ------------------------
const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle-text"
})

// function updateProfileInfo(evento) {
//   evento.preventDefault()
//   if(indexName.value != "" && indexAbout.value != "") {
//     userInfo.setUserInfo(indexName.value, indexAbout.value)
//     PopupProfile.close()
//   }
// }
saveButton.addEventListener("click", function (evento){
  evento.preventDefault()
  if(indexName.value != "" && indexAbout.value != "") {
    userInfo.setUserInfo(indexName.value, indexAbout.value)
    PopupProfile.close()
  }
})

// ------ ABERTURA E FECHAMENTO DO PROFILE POPUP
const PopupProfile = new PopupWithForm("#editProfilePopup")
PopupProfile.setEventListeners()
editButton.addEventListener("click", () =>
  PopupProfile.open())
closeButton.addEventListener("click", () =>
  PopupProfile.close())



// ------------------------------------ CARD POPUP ------------------------------------------


// ------- ABERTURA E FECHAMENTO DO CARD POPUP
const PopupCard = new PopupWithForm("#addCardPopup")
addButton.addEventListener("click", () =>
  PopupCard.open())
closeBtnCardPopup.addEventListener("click", () =>
  PopupCard.close())
PopupCard.setEventListeners()

// -------  CARDS

// ------------- FUNÇÃO CRIA CARD
function renderCard(card) {
  const newCard = new Card ({
  card,
  cardselector: "#card-template",
  openBigImage,
}).generateCard()
section.addItem(newCard)
}

// -------------- RENDERIZAÇÃO INICIAL
const section = new Section({
items: initialCards,
renderer: renderCard},
 ".elements")
section.renderItems()


function addNewCard(event){
event.preventDefault()
if(indexTitle.value != "" && indexLink.value != "") {
  const newCard = new Card ({
    card: {
      name: indexTitle.value,
      link: indexLink.value
    },
    cardselector: "#card-template",
    openBigImage,
  }).generateCard()
  containerCard.prepend(newCard)
  indexTitle.value = ""
  indexLink.value = ""
  PopupCard.close();
}
}
createButton.addEventListener("submit", addNewCard)

// ------ AMPLIAÇÃO DA IMAGEM
const popupImage = new PopupWithImage("#PopupImage")
popupImage.setEventListeners()

function openBigImage(card) {
popupImage.open(card)
buttonCloseImage.addEventListener("click", () =>
  popupImage.close())
}
