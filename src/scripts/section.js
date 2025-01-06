export default class Section {
  constructor({items, renderer}, seletor) {
    this._items = items
    this._renderer = renderer
    this._seletor = seletor
  }

  addItem(card){
    const section = document.querySelector(this._seletor)
    section.append(card)
  }

  renderItems(){
    this._items.forEach(card => {
      this._renderer(card)
    });
  }
}

