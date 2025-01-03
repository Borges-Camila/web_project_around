import Popup from "./popup.js";

export default class PopupWithConfirmation extends Popup{
  constructor(seletorPopup, deleteCard){
    super(seletorPopup);
    this._deleteCard = deleteCard
  }

// a função de deleteCard deve ser chamada nesse construtor e aqui é que ele vai excluir
// essa função é que vai excluir o cartão ao clicar no botão de sim
  open(card){
    super.open();
    this._card = card;
  }

  setEventListeners(){
    super.setEventListeners();
  }

}