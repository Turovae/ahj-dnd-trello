/* eslint-disable no-underscore-dangle */
export default class StateService {
  constructor(name) {
    this.name = name;
    this._states = {};
  }

  updateAllStates() {
    const container = document.querySelector(`.${this.name}`);

    this.getNames().forEach((name) => {
      const selector = name.toLowerCase().replace(/\W/, '-');
      const element = container.querySelector(`.${selector}`);
      const cardTitles = element.querySelectorAll('.card-title');
      this.setState(name, [...cardTitles].map((title) => title.textContent));
    });
  }

  fillStates(states) {
    this._states = states;
  }

  get states() {
    return this._states;
  }

  getNames() {
    return Object.keys(this._states);
  }

  getState(name) {
    return this._states[name];
  }

  setState(name, states) {
    this._states[name] = states;
  }

  addState(name, state) {
    if (this._states[name]) {
      this._states[name].push(state);
    }
  }

  deleteState(name, state) {
    const states = this._states[name];
    if (states.includes(state)) {
      this._states[name] = states.filter((card) => card !== state);
    }
  }
}
