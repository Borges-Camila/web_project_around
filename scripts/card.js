export default class Card {
  constructor({card, cardselector, openBigImage, deleteCard, ownerId}){
   this._card = card
   this._cardselector =  cardselector
   this._openBigImage = openBigImage
   this._deleteCard = deleteCard
   this._ownerId = ownerId
  }

  _getTemplate(){
    const Template = document.querySelector(this._cardselector).content.querySelector(".element").cloneNode(true)
    return Template
  }


  _handleDeleteCard(){
    if (this._ownerId !== this._card.owner){
      alert("Não é possível deletar este cartão!")
      return
    }
    this._deleteCard(this._card._id)
  }

  _setEventListeners(){
    this._element.querySelector(".element__trash").addEventListener("click", () => {
      this._handleDeleteCard()
    })
    this._element.querySelector(".element__heart").addEventListener("click", (eve) => {
      eve.target.classList.toggle("element__heart-active")
    })

    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._openBigImage({ url: this._card.link, name: this._card.name })
    })


  }


  generateCard() {
    this._element = this._getTemplate()

    this._element.querySelector(".element__place-name").textContent = this._card.name
    this._element.querySelector(".element__image").setAttribute("src", this._card.link)
    this._element.querySelector(".element__image").setAttribute("alt", this._card.name)

    this._setEventListeners()

    return this._element
  }
}