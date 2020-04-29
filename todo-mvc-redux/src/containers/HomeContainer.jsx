import { connect } from 'react-redux';
import Home from '../components/Home';
import {
  addItem,
  deleteItem,
  toggleIsCompleted,
  changeShowingGroup,
  showModal,
  hideModal,
} from '../actions';

const getVisibleTodoItems = (todoItems, showingGroup) => todoItems.filter((item) => {
  switch (showingGroup) {
    case 'all':
      return true;
    case 'completed':
      return item.isCompleted;
    case 'uncompleted':
      return !item.isCompleted;
    default:
      return false;
  }
});

const mapStateToProps = (state) => ({
  visibleTodoItems: getVisibleTodoItems(state.todoItems.todoItems, state.todoFilter.showingGroup),
  showingGroup: state.todoFilter.showingGroup,
  isAddTodoBarVisible: state.modalVisible.isAddTodoBarVisible,
});

const mapDispatchToProps = {
  handleAddTodoItem: addItem,
  handleDeleteItem: deleteItem,
  handleChangeIsCompleted: toggleIsCompleted,
  handleChangeShowingGroup: changeShowingGroup,
  showAddTodoBar: showModal,
  hideAddTodoBar: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
