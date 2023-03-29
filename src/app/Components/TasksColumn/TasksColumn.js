import './TasksColumn.css';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Card from '../Card/Card';

export default class TasksColumn {
  constructor(title, stateService) {
    this.title = title;
    this.stateService = stateService;

    this.column = null;
    this.board = null;

    this.cardsContainer = null;

    this.footer = null;
    this.openFormBtn = null;
    this.addTaskForm = null;

    this.dragged = null;

    this.addCard = this.addCard.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.moveCard = this.moveCard.bind(this);

    this.createColumn();
  }

  createColumn() {
    this.column = document.createElement('div');
    const title = this.title.toLowerCase().replace(/\W/, '-');
    this.column.classList.add('column', title);
    this.column.dataset.name = title;

    this.column.insertAdjacentHTML(
      'beforeend',
      TasksColumn.createHeader(this.title, 'column-header'),
    );

    this.cardsContainer = document.createElement('ul');
    this.cardsContainer.classList.add('column-list', 'cards');
    this.column.appendChild(this.cardsContainer);

    this.renderCards();

    this.footer = document.createElement('div');
    this.footer.classList.add('column-footer');
    this.column.appendChild(this.footer);

    this.openFormBtn = document.createElement('a');
    this.openFormBtn.href = '#';
    this.openFormBtn.classList.add('open-form');
    this.openFormBtn.textContent = '+ Add another card';
    this.footer.appendChild(this.openFormBtn);
    this.openFormBtn.addEventListener('click', this.openForm);
  }

  bindToDOM(element) {
    if (typeof element === 'string') {
      this.board = document.querySelector(element);
    } else {
      this.board = element;
    }

    if (!(this.board instanceof HTMLElement)) {
      throw new Error('Контейнер не является DOM-элементом');
    }

    this.board.appendChild(this.column);
  }

  createAndAppendCard(card) {
    const cardEl = document.createElement('li');
    cardEl.classList.add('card');
    cardEl.addEventListener('mousedown', this.startDrag);

    const cardTxt = document.createElement('span');
    cardTxt.textContent = card;
    cardTxt.classList.add('card-text');
    cardEl.appendChild(cardTxt);

    const delBtn = document.createElement('button');
    delBtn.classList.add('del-btn');
    delBtn.innerHTML = '<span>&#9587;</span>';
    cardEl.appendChild(delBtn);

    delBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cardEl.remove();

      this.cards = [...this.cardsContainer.querySelectorAll('.card-text')]
        .map((elem) => elem.textContent);
    });

    this.cardsContainer.appendChild(cardEl);
  }

  renderCards() {
    const cards = this.stateService.getState(this.title);

    cards.forEach((card) => {
      const cardCl = new Card(card, this);
      cardCl.appendTo(this.cardsContainer);
    });
    // this.cards.forEach((card) => {
    //   this.createAndAppendCard(card);

    //   const cardCl = new Card(card, this);
    //   cardCl.appendTo(this.cardsContainer);
    //   console.log(cardCl);
    // });
  }

  addCard(text) {
    this.cards.push(text);

    const cardCl = new Card(text, this);
    cardCl.appendTo(this.cardsContainer);
  }

  openForm(event) {
    event.preventDefault();
    this.addTaskForm = new AddTaskForm(this);
    this.addTaskForm.bindToDOM(this.footer);
    this.openFormBtn.removeEventListener('click', this.openForm);
    this.openFormBtn.addEventListener('click', this.closeForm);
  }

  closeForm(event) {
    event.preventDefault();

    this.deleteForm();
  }

  deleteForm() {
    this.addTaskForm.delete();
    this.addTaskForm = null;
    this.openFormBtn.removeEventListener('click', this.closeForm);
    this.openFormBtn.addEventListener('click', this.openForm);
  }

  startDrag(event) {
    event.preventDefault();
    if (event.target.closest('.del-btn')) {
      return;
    }

    this.dragged = event.target.closest('.card');
    if (!this.dragged) {
      return;
    }

    console.log(this.dragged);

    const shiftX = event.clientX - this.dragged.getBoundingClientRect().left;
    const shiftY = event.clientY - this.dragged.getBoundingClientRect().top;
    const {width, height} = this.dragged.getBoundingClientRect();

    console.log(shiftX, shiftY);
    this.dragged.classList.add('dragged');
    this.dragged.style.width = `${width}px`;
    this.dragged.style.height = `${height}px`;

    this.dragged.addEventListener('mousemove', this.moveCard);
    this.dragged.addEventListener('mouseup', this.endDrag);
  }

  endDrag(event) {
    event.preventDefault();

    console.log('endDrag');

    this.dragged.classList.remove('dragged');

    this.dragged.removeEventListener('mousemove', this.moveCard);
    this.dragged.removeEventListener('mouseup', this.endDrag);
    this.dragged = null;
  }

  moveCard(event) {
    event.preventDefault();
  }

  static createHeader(title, _class) {
    return `
      <h2 class="${_class}">${title}</h2>
    `;
  }
}
