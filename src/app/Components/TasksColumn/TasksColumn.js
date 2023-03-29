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

    this.addCard = this.addNewCard.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);

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

  renderCards() {
    const cards = this.stateService.getState(this.title);

    this.cardsContainer.innerHTML = '';
    cards.forEach((card) => {
      const cardCl = new Card(card, this, this.stateService);
      cardCl.appendTo(this.cardsContainer);
    });
  }

  addNewCard(title) {
    this.stateService.addState(this.title, title);

    const cardCl = new Card(title, this, this.stateService);
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

  static createHeader(title, _class) {
    return `
      <h2 class="${_class}">${title}</h2>
    `;
  }
}
