import { SHOW_MODAL, HIDE_MODAL } from '../actions/index';

const initialState = {
  isAddTodoBarVisible: false,
};

const todoFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        isAddTodoBarVisible: true,
      };
    case HIDE_MODAL:
      return {
        isAddTodoBarVisible: false,
      };
    default:
      return state;
  }
};

export default todoFilterReducer;
