export default class Card {
  constructor({
    card,
    cardselector,
    openBigImage,
    openConfirmationPopup,
    ownerId,
    handleLiked,
    removeLiked,
  }) {
    this._card = card;
    this._cardselector = cardselector;
    this._openBigImage = openBigImage;
    this._openConfirmationPopup = openConfirmationPopup;
    this._ownerId = ownerId;
    this._likes = card.isLiked;
    this._cardId = card._id;
    this._handleLiked = handleLiked;
    this._removeLiked = removeLiked;
  }

  _getTemplate() {
    const Template = document
      .querySelector(this._cardselector)
      .content.querySelector(".element")
      .cloneNode(true);
    return Template;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        if (this._ownerId === this._card.owner) {
          this._openConfirmationPopup(this._element, this._cardId);
        } else {
          alert("Não é possível deletar este cartão!");
          return;
        }
      });
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", (eve) => {
        if (this._likes == false) {
          eve.target.classList.add("element__heart-active");
          this._handleLiked(this, "true");
        } else {
          eve.target.classList.remove("element__heart-active");
          this._removeLiked(this);
        }
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openBigImage({ url: this._card.link, name: this._card.name });
      });
  }

  isLiked() {
    if (this._likes == true) {
      this._element
        .querySelector(".element__heart")
        .classList.add("element__heart-active");
    } else {
      this._element
        .querySelector(".element__heart")
        .classList.remove("element__heart-active");
    }
  }

  updateLikesView() {
    this._likes = !this._likes;
    this.isLiked();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__place-name").textContent =
      this._card.name;
    this._element
      .querySelector(".element__image")
      .setAttribute("src", this._card.link);
    this._element
      .querySelector(".element__image")
      .setAttribute("alt", this._card.name);

    this._setEventListeners();
    this.isLiked();

    return this._element;
  }
}
