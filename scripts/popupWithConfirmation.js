import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup{
  constructor(seletorPopup, handleFormSubmit){
    super(seletorPopup);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners(){
    super.setEventListeners();
    const yesButton = this._popup.querySelector("#popupDeleteButton")
    yesButton.addEventListener("click", () => {
      console.log(this._handleFormSubmit)
      this._handleFormSubmit()
    })
  }

}