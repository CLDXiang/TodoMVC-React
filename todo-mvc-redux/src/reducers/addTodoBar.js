import { CHANGE_CONTENT, CHANGE_DEADLINE } from '../actions/index';

const initialState = {
  content: '',
  deadLine: '',
};

const addTodoBarReducer = (state = initialState, action) => {
  let content;
  let deadline;
  switch (action.type) {
    case CHANGE_CONTENT:
      content = action.payload.content;
      return {
        ...state,
        content,
      };
    case CHANGE_DEADLINE:
      deadline = action.payload.deadline;
      return {
        ...state,
        // typo
        deadLine: deadline,
      };
    default:
      return state;
  }
};

export default addTodoBarReducer;
