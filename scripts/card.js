export default class Card {
  constructor({card, cardselector, openBigImage}){
   this._card = card
   this._cardselector =  cardselector
   this._openBigImage = openBigImage
  }

  _getTemplate(){
    const Template = document.querySelector(this._cardselector).content.querySelector(".element").cloneNode(true)
    return Template
  }

  _setEventListeners(){
    this._element.querySelector(".element__trash").addEventListener("click", (event) => {
      event.target.parentElement.remove()
    })
    this._element.querySelector(".element__heart").addEventListener("click", (eve) => {
      eve.target.classList.toggle("element__heart-active")
    })

    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._openBigImage()
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