import './AddTaskForm.css';

export default class AddTaskForm {
  constructor(controlled) {
    this.form = null;
    this.controlled = controlled;

    this.container = null;

    this.textarea = null;
    this.addBtn = null;

    this.addCard = this.addCard.bind(this);

    this.create();
  }

  create() {
    this.form = document.createElement('form');
    this.form.classList.add('form_card-create');

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.rows = 3;
    this.textarea.placeholder = 'Enter a title for this card...';
    this.textarea.required = true;
    this.form.appendChild(this.textarea);
    this.form.addEventListener('submit', this.addCard);

    this.addBtn = document.createElement('button');
    this.addBtn.classList.add('add-btn');
    this.addBtn.textContent = 'Add Card';
    this.addBtn.type = 'submit';
    this.form.appendChild(this.addBtn);
  }

  bindToDOM(element) {
    if (typeof element === 'string') {
      this.container = document.querySelector(element);
    } else {
      this.container = element;
    }

    if (!(this.container instanceof HTMLElement)) {
      throw new Error('Контейнер не является DOM-элементом');
    }

    this.container.appendChild(this.form);
    this.textarea.focus();
  }

  delete() {
    this.form.remove();
  }

  addCard(event) {
    event.preventDefault();
    this.controlled.addCard(this.textarea.value);

    this.controlled.deleteForm();
  }
}
