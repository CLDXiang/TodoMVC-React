/* eslint-disable no-alert */
import React, { Component } from 'react';
import './AddTodoBar.css';

class AddTodoBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      deadLine: '',
    };
  }

  onContentChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  onDeadLineChange = (e) => {
    this.setState({
      deadLine: e.target.value,
    });
  };

  handleClickConfirmButton = () => {
    const { content, deadLine } = this.state;
    const { hideAddTodoBar, handleAddTodoItem } = this.props;
    if (content.trim().length === 0) {
      window.alert('请输入内容');
      return;
    }
    if (deadLine === '') {
      window.alert('请选择截止时间');
      return;
    }
    // TODO: 截止时间不能比现在更早
    handleAddTodoItem({ content, deadLine });
    hideAddTodoBar();
  }

  render() {
    const { hideAddTodoBar } = this.props;
    const { content, deadLine } = this.state;

    return (
      <div className="add-todo-bar">
        <div className="add-todo-bar__form">
          <div className="add-todo-bar__form-item">
            内容：
            <input
              type="text"
              value={content}
              onChange={this.onContentChange}
            />
          </div>
          <div className="add-todo-bar__form-item">
            截止时间：
            <input
              type="datetime-local"
              value={deadLine}
              onChange={this.onDeadLineChange}
            />
          </div>
        </div>
        <div className="add-todo-bar__actions">
          <button
            type="button"
            onClick={this.handleClickConfirmButton}
          >
            确认
          </button>
          <button type="button" onClick={() => hideAddTodoBar()}>
            返回
          </button>
        </div>
      </div>
    );
  }
}

export default AddTodoBar;
