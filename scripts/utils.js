
export const editButton = document.querySelector(".profile__edit-button")
export const profilePopup = document.querySelector("#editProfilePopup")
export const closeButton = document.querySelector(".popup__close-button")
export const indexName = document.querySelector("#input-name")
export const indexAbout = document.querySelector("#input-about")
export const profileName = document.querySelector(".profile__title")
export const profileAbout = document.querySelector(".profile__subtitle-text")
export const saveButton = document.querySelector(".popup__save-button")
export const addButton = document.querySelector(".profile__add-button")
export const CardPopup = document.querySelector("#addCardPopup")
export const closeBtnCardPopup = document.querySelector("#close-button-card")
export const indexTitle = document.querySelector("#input-title")
export const indexLink = document.querySelector("#input-link")
export const containerCard = document.querySelector(".elements")
export const placeName = document.querySelector(".element__place-name")
export const createButton = document.querySelector("#create-button")
export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];
export const elementImage = document.querySelector(".element__image")
export const bigImage = document.querySelector("#PopupImage")
export const buttonCloseImage = document.querySelector("#CloseImagePopup")


// ------------ função que abre e fecha profile popup ---------------
export function openPopup() {
  profilePopup.classList.add("popup__change")
}
export function closePopup() {
  profilePopup.classList.remove("popup__change")
}


// ------------ função que abre e fecha card popup ---------------

export function openCardPopup (){
  CardPopup.classList.add("popup__change")
}
export function closeCardPopup (){
  CardPopup.classList.remove("popup__change")
}


// ----------- função para fechar a imagem ampliada--------------

export function removeBigImage() {
  bigImage.classList.remove("popup__change")
}