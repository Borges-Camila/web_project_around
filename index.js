const editButton = document.querySelector(".profile__edit-button") // botão do profile
const profilePopup = document.querySelector("#editProfilePopup")  // profile popup
const closeButton = document.querySelector(".popup__close-button") // botão de fechamento do profile

const indexName = document.querySelector("#input-name") // campo do formulário
const indexAbout = document.querySelector("#input-about") // campo do formulário

const profileName = document.querySelector(".profile__title")  // chamando o que será modificado
const profileAbout = document.querySelector(".profile__subtitle-text") // chamando o que será modificado

const saveButton = document.querySelector(".popup__save-button") // chamando o botão de salvar


// funções que abre e fecha os popups
function openPopup() {
  profilePopup.classList.add("popup__change") // profile popup
}
editButton.addEventListener("click", openPopup)
function closePopup() {
  profilePopup.classList.remove("popup__change") // profile popup
}
closeButton.addEventListener("click", closePopup)

// Função para alterar as informações do profile
function updateProfileInfo(evento) {
  evento.preventDefault()
  if(indexName.value != "" && indexAbout.value != "") {
    profileName.textContent = indexName.value
    profileAbout.textContent = indexAbout.value
    closePopup()
  }
}
saveButton.addEventListener("click", updateProfileInfo)


// organizar a constante para o popup para adicionar os cards

const addButton = document.querySelector(".profile__add-button") // botão do + card
const CardPopup = document.querySelector("#addCardPopup") // popup Cartão
const closeCardPopup = document.querySelector("#close-button-card") // botão de fechar

// chamar os campos do formulário dos Cartões
const indexTitle = document.querySelector("#input-title")
const indexLink = document.querySelector("#input-link")

const containerCard = document.querySelector(".elements")

// colocar a constante referente a imagem e ao nome do local
const placeName = document.querySelector(".element__place-name")
const elementImage = document.querySelector(".element__image")

// botão do popup de cartões
const createButton = document.querySelector("#create-button")

// constante dos cartões iniciais
const initialCards = [
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


// função para o abrir e fechar o popup de adicionar cartões

addButton.addEventListener("click", function openCardPopup (){
  CardPopup.classList.add("popup__change")
})

closeCardPopup.addEventListener("click", function openCardPopup (){
  CardPopup.classList.remove("popup__change")
})


function createCard(card) {
  const Template = document.querySelector("#card-template").content
  const Element = Template.querySelector(".element").cloneNode(true)
  Element.querySelector(".element__place-name").textContent = card.name
  Element.querySelector(".element__image").setAttribute("src", card.link)
  Element.querySelector(".element__image").setAttribute("alt", card.name)
  return Element
}

for (const card of initialCards) {
  const newCard = createCard(card)
  containerCard.prepend(newCard)
}

function addNewCard(event){
  event.preventDefault()
  if(indexTitle.value != "" && indexLink.value != "") {
    createCard({
      name: indexTitle.value,
      link: indexLink.value
    })
    indexTitle.value = ""
    indexLink.value = ""
    containerCard.prepend(newCard)
  }
}

createButton.addEventListener("click", addNewCard)

// organizar a constante para o incone de coração
const heartButton = document.querySelector(".element__heart") // chamando o botão de coração

// função para ativar o botão de coração dos cards

function likeHeart() {
  heartButton.classList.toggle("element__heart-active")
}
heartButton.addEventListener("click", likeHeart)


// colocar a constante da lixeira dos cards
const trashButton = document.querySelector(".element__trash")


// função para ativar o botão de exclusão dos cards

