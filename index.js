const editButton = document.querySelector(".profile__edit-button")
const popup = document.querySelector(".popup")
const closeButton = document.querySelector(".popup__close-button")

const indexName = document.querySelector("#input-name")
const indexAbout = document.querySelector("#input-about")

const profileName = document.querySelector(".profile__title")
const profileAbout = document.querySelector(".profile__subtitle-text")

const saveButton = document.querySelector(".popup__save-button")

// organizar a constante para o incone de coração
const heartButton = document.querySelector(".element__heart")


function openPopup() {
  popup.classList.add("popup__change")
}
editButton.addEventListener("click", openPopup)

function closePopup() {
  popup.classList.remove("popup__change")
}
closeButton.addEventListener("click", closePopup)

function updateProfileInfo(evento) {
  evento.preventDefault()
  if(indexName.value != "" && indexAbout.value != "") {
    profileName.textContent = indexName.value
    profileAbout.textContent = indexAbout.value
    closePopup()
  }
}

saveButton.addEventListener("click", updateProfileInfo)

// função para ativar o botão de coração dos cards

function likeHeart() {
  heartButton.classList.toggle("element__heart-active")
}
heartButton.addEventListener("click", likeHeart)
