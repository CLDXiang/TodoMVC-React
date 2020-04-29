import { CHANGE_SHOWING_GROUP } from '../actions/index';

const initialState = {
  showingGroup: 'all',
};

const todoFilterReducer = (state = initialState, action) => {
  const { newGroup } = action.payload;
  switch (action.type) {
    case CHANGE_SHOWING_GROUP:
      return {
        showingGroup: newGroup,
      };
    default:
      return state;
  }
};

export default todoFilterReducer;
