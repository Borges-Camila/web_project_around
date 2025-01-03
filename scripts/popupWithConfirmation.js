import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup{
  constructor(seletorPopup){
    super(seletorPopup);
  }

  setDeleteAction(action){
    this._handleFormSubmit = action
  }

  setEventListeners(){
    super.setEventListeners();
    const yesButton = this._popup.querySelector("#popupDeleteButton")
    yesButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
      this.close();
    })
  }

}