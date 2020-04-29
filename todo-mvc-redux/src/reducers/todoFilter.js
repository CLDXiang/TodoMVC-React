import { CHANGE_SHOWING_GROUP } from '../actions/index';

const initialState = {
  showingGroup: 'all',
};

const todoFilterReducer = (state = initialState, action) => {
  let newGroup;
  switch (action.type) {
    case CHANGE_SHOWING_GROUP:
      newGroup = action.payload.newGroup;
      return {
        showingGroup: newGroup,
      };
    default:
      return state;
  }
};

export default todoFilterReducer;
