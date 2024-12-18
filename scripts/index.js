// ------ Import dos outros arquivos JS --------
import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import UserInfo from "./userInfo.js";
import {
  editButton,
  profilePopup,
  closeButton,
  indexName,
  indexAbout,
  profileName,
  profileAbout,
  saveButton,
  addButton,
  CardPopup,
  closeBtnCardPopup,
  indexTitle,
  indexLink,
  containerCard,
  createButton,
  initialCards,
  bigImage,
  buttonCloseImage,
  openPopup,
  closePopup,
  openCardPopup,
  closeCardPopup,
  removeBigImage
} from "./utils.js";

// ----------------- ABRE E FECHA PROFILE POPUP -------------------
editButton.addEventListener("click", openPopup)
closeButton.addEventListener("click", closePopup)

// ----------------- ABRE E FECHA PROFILE POPUP -------------------
addButton.addEventListener("click", openCardPopup)
closeBtnCardPopup.addEventListener("click", closeCardPopup)

// ----------------- ABRE E FECHA IMAGEM AMPLIADA -------------------
buttonCloseImage.addEventListener("click", removeBigImage)


// função para fechar o popup clicando na sobreposição e no esc

document.addEventListener("click", function (evento){
  if (evento.target == profilePopup){
      closePopup()}
  if (evento.target == CardPopup){
      closeCardPopup ()}
  if (evento.target == bigImage){
      removeBigImage()}
})

document.addEventListener("keydown", function (e){
 if (e.key === "Escape") {
  closePopup()
  closeCardPopup ()
  removeBigImage() }
})


// -------------------- ALTERAÇÃO DE PROFILE ------------------------
const userInfo = new UserInfo({name: ".profile__title", about: ".profile__subtitle-text"})

function updateProfileInfo(evento) {
  evento.preventDefault()
  if(indexName.value != "" && indexAbout.value != "") {
    userInfo.setUserInfo(indexName.value, indexAbout.value)
    closePopup()
  }
}
saveButton.addEventListener("click", updateProfileInfo)

// -------------------- CARTÕES ------------------------

function renderCard(card) {
    const newCard = new Card ({
    card,
    cardselector: "#card-template",
    openBigImage
  }).generateCard()

  section.addItem(newCard)
}

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
      openBigImage
    }).generateCard()
    containerCard.prepend(newCard)
    indexTitle.value = ""
    indexLink.value = ""
    closeCardPopup()
  }
}
createButton.addEventListener("click", addNewCard)

// -------------------- FUNÇÃO DE AMPLIAÇÃO DA IMAGEM -----------------------

function openBigImage() {
  bigImage.classList.add("popup__change")
    bigImage.querySelector(".popup__paragraph").textContent = this._card.name
    bigImage.querySelector(".popup__image").setAttribute("src", this._card.link)
}

// --------------------- VALIDAÇÃO DOS CAMPOS ---------------------------
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