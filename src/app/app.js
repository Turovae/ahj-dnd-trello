import TasksColumn from './Components/TasksColumn/TasksColumn';
import StateService from './Utils/StateService';

const stateService = new StateService('board2');
stateService.fillStates({
  ToDo: ['Card 1', 'Card 2'],
  'In progress': ['Card 3', 'Card 4', 'Card 5', 'Card 6'],
  Done: ['Card 7', 'Card 8', 'Card 9'],
});

stateService.getNames().forEach((name) => {
  const columnEl = new TasksColumn(name, stateService);
  columnEl.bindToDOM('.board2');
});
