
export const editButton = document.querySelector(".profile__edit-button")
export const profilePopup = document.querySelector("#editProfilePopup")
export const closeButton = document.querySelector(".popup__close-button")// botão
export const indexName = document.querySelector("#input-name")
export const indexAbout = document.querySelector("#input-about")
export const saveButton = document.querySelector(".popup__save-button")
export const addButton = document.querySelector(".profile__add-button")
export const CardPopup = document.querySelector("#addCardPopup")
export const closeBtnCardPopup = document.querySelector("#close-button-card")// botão
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
export const buttonCloseImage = document.querySelector("#CloseImagePopup")// botão

// botão

// ----------------- ABRE E FECHA PROFILE POPUP ---------------
export function openPopup() {
  profilePopup.classList.add("popup__change");
  document.addEventListener("keydown", closeWithEsc);
}
export function closePopup() {
  profilePopup.classList.remove("popup__change");
  document.removeEventListener("keydown", closeWithEsc);
}

// ----------------- ABRE E FECHA CARD POPUP ---------------

export function openCardPopup (){
  CardPopup.classList.add("popup__change");
  document.addEventListener("keydown", closeWithEsc);
}
export function closeCardPopup (){
  CardPopup.classList.remove("popup__change");
  document.removeEventListener("keydown", closeWithEsc);
}

// ---------------- ABRE E FECHA POPUP IMG AMPLIADA --------------

export function removeBigImage() {
  bigImage.classList.remove("popup__change");
  document.removeEventListener("keydown", closeWithEsc);

}

//  --------------- FUNÇÃO FECHA POPUP COM ESC ---------------------

function closeWithEsc(e) {
  if (e.key === "Escape") {
    const showPopup = document.querySelector("popup__change");
    if (showPopup) {
      closePopup(showPopup);
      closeCardPopup(showPopup);
      removeBigImage(showPopup);
    }
  }
}
