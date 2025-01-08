import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__paragraph");
  }

  open({ url, name }) {
    this._image.src = url;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
