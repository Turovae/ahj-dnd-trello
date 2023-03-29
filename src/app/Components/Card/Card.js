import './Card.css';

export default class Card {
  constructor(title, parent) {
    this.title = title;
    this.parent = parent;

    this.element = null;

    this.delBtn = null;

    this.create();
  }

  create() {
    this.element = document.createElement('li');
    this.element.classList.add('card');
    // здесь будет обработчик нажатия кнопки мыши

    const titleEl = document.createElement('span');
    titleEl.textContent = this.title;
    titleEl.classList.add('card-title');
    this.element.appendChild(titleEl);

    this.delBtn = document.createElement('button');
    this.delBtn.classList.add('del-btn');
    this.delBtn.textContent = String.fromCharCode('9587');
    this.element.appendChild(this.delBtn);
  }

  appendTo(container) {
    container.appendChild(this.element);
  }
}
