// todoItems

export const ADD_ITEM = 'ADD_ITEM';

export const DELETE_ITEM = 'DELETE_ITEM';

export const TOGGLE_IS_COMPLETED = 'TOGGLE_COMPLETED';

export const addItem = (item) => ({ type: ADD_ITEM, payload: { item } });

export const deleteItem = (id) => ({ type: DELETE_ITEM, payload: { id } });

export const toggleIsCompleted = (id) => ({
  type: TOGGLE_IS_COMPLETED,
  payload: { id },
});

// todoFilter

export const CHANGE_SHOWING_GROUP = 'CHANGE_SHOWING_GROUP';

export const changeShowingGroup = (newGroup) => ({
  type: CHANGE_SHOWING_GROUP,
  payload: { newGroup },
});

// modalVisible

export const SHOW_MODAL = 'SHOW_MODAL';

export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = () => ({ type: SHOW_MODAL });

export const hideModal = () => ({ type: HIDE_MODAL });
