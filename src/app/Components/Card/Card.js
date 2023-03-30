import './Card.css';

export default class Card {
  constructor(title, parent, stateService) {
    this.title = title;
    this.parent = parent;
    this.stateService = stateService;

    this.element = null;
    this.stub = null;
    this.targetList = null;

    this.delBtn = null;

    this.lastPositionPointer = null;

    this.deleteCard = this.deleteCard.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.moveCard = this.moveCard.bind(this);

    this.create();

    this.shiftX = null;
    this.shiftY = null;
    this.width = null;
    this.height = null;
  }

  create() {
    this.element = document.createElement('li');
    this.element.classList.add('card', 'list-item');
    this.element.addEventListener('mousedown', this.startDrag);

    const titleEl = document.createElement('span');
    titleEl.textContent = this.title;
    titleEl.classList.add('card-title');
    this.element.appendChild(titleEl);

    this.delBtn = document.createElement('button');
    this.delBtn.classList.add('del-btn');
    this.delBtn.textContent = String.fromCharCode('9587');
    this.element.appendChild(this.delBtn);
    this.delBtn.addEventListener('click', this.deleteCard);

    this.stub = document.createElement('li');
    this.stub.classList.add('list-item', 'card-stub');

    this.lastPositionPointer = document.createElement('li');
    this.lastPositionPointer.style.height = '0px';
  }

  appendTo(container) {
    container.appendChild(this.element);
  }

  deleteCard() {
    // this.stateService.deleteState(this.parent.title, this.title);
    // this.parent.renderCards();
    this.element.remove();
    this.stateService.updateAllStates();
  }

  startDrag(event) {
    event.preventDefault();
    if (event.target.closest('.del-btn')) {
      return;
    }

    this.shiftX = event.clientX - this.element.getBoundingClientRect().left;
    this.shiftY = event.clientY - this.element.getBoundingClientRect().top;
    this.width = this.element.getBoundingClientRect().width;
    this.height = this.element.getBoundingClientRect().height;

    this.stub.style.width = `${this.width}px`;
    this.stub.style.height = `${this.height}px`;

    this.element.classList.add('dragged');
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;

    // this.parent.cardsContainer.replaceChild(this.stub, this.element);
    this.targetList = this.element.closest('.cards');
    this.targetList.replaceChild(this.lastPositionPointer, this.element);
    this.lastPositionPointer.insertAdjacentElement('beforebegin', this.stub);

    document.body.appendChild(this.element);
    this.element.style.left = `${event.clientX - this.shiftX}px`;
    this.element.style.top = `${event.clientY - this.shiftY}px`;

    document.addEventListener('mousemove', this.moveCard);
    document.addEventListener('mouseup', this.endDrag);
  }

  endDrag(event) {
    event.preventDefault();

    this.element.classList.remove('dragged');
    this.element.style = '';

    // Временное решение
    // this.parent.cardsContainer.replaceChild(this.element, this.stub);
    if (this.targetList) {
      this.targetList.replaceChild(this.element, this.stub);
    } else {
      this.lastPositionPointer.parentElement.replaceChild(this.element, this.lastPositionPointer);
    }

    document.removeEventListener('mousemove', this.moveCard);
    document.removeEventListener('mouseup', this.endDrag);
    this.lastPositionPointer.remove();
    this.stateService.updateAllStates();
  }

  moveCard(event) {
    event.preventDefault();

    this.element.style.left = `${event.clientX - this.shiftX}px`;
    this.element.style.top = `${event.clientY - this.shiftY}px`;

    const targetEl = event.target;

    if (targetEl === this.stub) {
      return;
    }

    if (targetEl && targetEl.closest('.column')) {
      this.targetList = targetEl.closest('.column').querySelector('.cards');
    } else {
      this.targetList = null;
    }
    this.stub.remove();

    const card = targetEl.closest('.card');

    if (card) {
      card.insertAdjacentElement('beforebegin', this.stub);
      return;
    }

    const underListElem = targetEl.closest('.column-footer');
    if (underListElem) {
      this.targetList.appendChild(this.stub);
    }
  }
}
