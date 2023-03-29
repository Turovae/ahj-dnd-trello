/* eslint-disable no-underscore-dangle */
export default class StateService {
  constructor(name) {
    this.name = name;
    this._states = {};
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

  redrawStates() {
    this.state = {};
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
