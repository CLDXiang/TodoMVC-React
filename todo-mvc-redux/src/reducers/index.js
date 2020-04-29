import { combineReducers } from 'redux';
import todoFilter from './todoFilter';
import todoItems from './todoItems';
import modalVisible from './modalVisible';

export default combineReducers({
  todoFilter,
  todoItems,
  modalVisible,
});
