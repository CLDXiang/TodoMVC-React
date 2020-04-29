/* eslint-disable no-alert */
import React, { Component } from 'react';
import './AddTodoBar.css';

class AddTodoBar extends Component {
  handleClickConfirmButton = () => {
    const {
      hideAddTodoBar, handleAddTodoItem, content, deadLine,
    } = this.props;
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
  };

  render() {
    const {
      hideAddTodoBar, content, deadLine, changeContent, changeDeadline,
    } = this.props;
    return (
      <div className="add-todo-bar">
        <div className="add-todo-bar__form">
          <div className="add-todo-bar__form-item">
            内容：
            <input
              type="text"
              value={content}
              onChange={(e) => changeContent(e.target.value)}
            />
          </div>
          <div className="add-todo-bar__form-item">
            截止时间：
            <input
              type="datetime-local"
              value={deadLine}
              onChange={(e) => changeDeadline(e.target.value)}
            />
          </div>
        </div>
        <div className="add-todo-bar__actions">
          <button type="button" onClick={this.handleClickConfirmButton}>
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
