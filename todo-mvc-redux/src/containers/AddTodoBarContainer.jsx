import { connect } from 'react-redux';
import AddTodoBar from '../components/AddTodoBar';
import {
  addItem,
  hideModal,
  changeContent,
  changeDeadline,
} from '../actions';

const mapStateToProps = (state) => ({
  content: state.addTodoBar.content,
  deadLine: state.addTodoBar.deadLine,
});

const mapDispatchToProps = {
  changeContent,
  changeDeadline,
  handleAddTodoItem: addItem,
  hideAddTodoBar: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoBar);
