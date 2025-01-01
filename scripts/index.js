// IMPLEMENTAR ROTAS DA API


// ----------------------- IMPORT JS -------------------------
import Card from "./card.js";
import FormValidator from "./formValidator.js";
import Section from "./section.js";
import UserInfo from "./userInfo.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";
import Api from "./api.js";
import {
  editButton,
  closeButton,
  indexName,
  indexAbout,
  addButton,
  closeBtnCardPopup,
  indexTitle,
  indexLink,
  containerCard,
  buttonCloseImage,
  token,
  cardOwner,
  avatarEditBtn,
  avatarPopupClose,
  avatarLinkInput,
  avatarSaveBtn
} from "./utils.js";


// --------------------- VALIDAÇÃO ---------------------------
new FormValidator({
  config: {
    formSelector: 'form',
    inputSelector: 'input',
    saveButtonSelector: '#profile-saveButton',
    createuttonSelector: '#create-button',
    avatarButtonSelector: '#profileImg-saveButton',
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
    saveButtonSelector: '#profile-saveButton',
    createuttonSelector: '#create-button',
    avatarButtonSelector: '#profileImg-saveButton',
    inactiveButtonClass: 'popup__button-error',
    inputErrorClass: 'popup__input-error',
    messageErrorClass: 'popup__message-error'
  },
  formSelector: "#card-form"
}).enableValidation()

new FormValidator({
  config: {
    formSelector: 'form',
    inputSelector: 'input',
    saveButtonSelector: '#profile-saveButton',
    createuttonSelector: '#create-button',
    avatarButtonSelector: '#profileImg-saveButton',
    inactiveButtonClass: 'popup__button-error',
    inputErrorClass: 'popup__input-error',
    messageErrorClass: 'popup__message-error'
  },
  formSelector: "#profileImg-form"
}).enableValidation()


// --------------------- cria API ----------------------------
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json"
  }
});

// ------------------------------------ PROFILE POPUP ------------------------------------------

// ------ ABERTURA E FECHAMENTO DO PROFILE INFO POPUP
const PopupProfile = new PopupWithForm("#editProfilePopup", updateProfileInfo)
PopupProfile.setEventListeners()
editButton.addEventListener("click", () =>
  PopupProfile.open())

closeButton.addEventListener("click", () =>
  PopupProfile.close())

// ------ CHAMAMENTO DAS INFORMAÇÕES DO PROFILE

api.getUsersInfo()
.then(res => {
  if (res.status !== 200){
    console.log(res);
    return Promise.reject("Erro no get users");
  }
  return res.json()
}).then(user => {
console.log(user)
}).catch(error => {
  console.log(`[GET] - user - ${error}`);
})

// ----- ALTERAÇÃO DE PROFILE

const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__subtitle-text",
  img: ".profile__avatar"
})

function updateProfileInfo(evento) {
  api.editProfileInfo({
    name: indexName.value,
    about: indexAbout.value
  })
  .then(res => {
    if (res.ok){
      console.log(res);
      return Promise.reject("Erro no patch das informações dos users");
    }
    return res.json()
  }).then(newUserInfo => {
  console.log(newUserInfo)

  if(indexName.value != "" && indexAbout.value != "") {
    userInfo.setUserInfo(indexName.value, indexAbout.value)
  }

  }).catch(error => {
    console.log(`[PATCH] - new user info - ${error}`);
  })
  PopupProfile.close()
}


// ---------------------------------- AVATAR POPUP ---------------------------------------

const avatarPopup = new PopupWithForm(
  "#editProfileImg",
  updateAvatarImg)
avatarPopup.setEventListeners()

// ------------ ABERTURA E FECHAMENTO

avatarEditBtn.addEventListener("click", () =>
  avatarPopup.open())

avatarPopupClose.addEventListener("click", () =>
  avatarPopup.close())

//------------- FUNÇÃO DE MUDANÇA DO AVATAR

function updateAvatarImg(evento){
  api.editAvatarImg({ avatar: avatarLinkInput.value })
  .then(res => {
    if (res.ok){
      console.log(res);
      return Promise.reject("Erro no patch da nova imagem do avatar");
    }
    return res.json()
  }).then(avatarImg => {
  console.log(avatarImg)
   if(avatarLinkInput.value != "") {
      userInfo.setUserInfo(avatarLinkInput.value)
   }
  }).catch(error => {
    console.log(`[PATCH] - new avatar image - ${error}`);
  })

  avatarLinkInput.value=""
  avatarPopup.close()

}


// ------------------------------------ CARD POPUP ------------------------------------------

// ------- ABERTURA E FECHAMENTO DO CARD POPUP
const PopupCard = new PopupWithForm("#addCardPopup", addNewCard)
addButton.addEventListener("click", () =>
  PopupCard.open())

closeBtnCardPopup.addEventListener("click", () =>
  PopupCard.close())
PopupCard.setEventListeners()

// ------- CHAMANDO CARD COM API

let section
api.getInitialCards()
.then(res => {
  if (res.status !== 200){
    console.log(res);
    return Promise.reject("Erro no get cards");
  }
  return res.json()
}).then(cards => {
console.log(cards)
section = new Section({
  items: cards,
  renderer: renderCard},
   ".elements")
  section.renderItems()

}).catch(error => {
  console.log(`[GET] - cards - ${error}`);
})

// ------- FUNÇÃO CRIA CARD (COM API)
function renderCard(card) {
  const newCard = new Card ({
  card,
  cardselector: "#card-template",
  openBigImage,
  deleteCard,
  ownerId: cardOwner
}).generateCard()
section.addItem(newCard)
}

function addNewCard(){
api.createNewCard({
  "isLiked": false,
  "name": indexTitle.value,
  "link": indexLink.value,
  "owner": cardOwner
}).then(res => {
  if (res.status !== 201){
    return Promise.reject("Erro no post card");
  }
  return res.json()
}).then(card => {
  console.log("Novo card", card);

  const newCard = new Card ({
    card: card,
    cardselector: "#card-template",
    openBigImage,
    deleteCard,
    ownerId: cardOwner
  }).generateCard()
  containerCard.prepend(newCard)

}).catch(error => {
  console.log(`[GET] - card - ${error}`);
})

indexTitle.value = ""
indexLink.value = ""
PopupCard.close();

}

// ------------------ DELETAR CARTÕES ((( FALTA O POPUP DE CONFIRMAÇÃO )))
function deleteCard(card){
  api.deleteCard(card)
  .then(res => {
    if (res.status !== 204){
      console.log(res);
      return Promise.reject("Erro no delete card");
    }
  }).catch(error => {
    console.log("Card", card)
    console.log(`[DELETE] - cards -  ${card} - ${error}`);
  })
}

// ------ AMPLIAÇÃO DA IMAGEM
const popupImage = new PopupWithImage("#PopupImage")
popupImage.setEventListeners()

function openBigImage(card) {
popupImage.open(card)
buttonCloseImage.addEventListener("click", () =>
  popupImage.close())
}
