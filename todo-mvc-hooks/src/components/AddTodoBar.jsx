/* eslint-disable no-alert */
import React, { useState } from 'react';
import './AddTodoBar.css';

const AddTodoBar = (props) => {
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
  const { hideAddTodoBar, handleAddTodoItem } = props;

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleClickConfirmButton = () => {
    if (content.trim().length === 0) {
      window.alert('请输入内容');
      return;
    }
    if (deadline === '') {
      window.alert('请选择截止时间');
      return;
    }
    // TODO: 截止时间不能比现在更早
    handleAddTodoItem({ content, deadline });
    hideAddTodoBar();
  };

  return (
    <div className="add-todo-bar">
      <div className="add-todo-bar__form">
        <div className="add-todo-bar__form-item">
          内容：
          <input
            type="text"
            value={content}
            onChange={onContentChange}
          />
        </div>
        <div className="add-todo-bar__form-item">
          截止时间：
          <input
            type="datetime-local"
            value={deadline}
            onChange={onDeadlineChange}
          />
        </div>
      </div>
      <div className="add-todo-bar__actions">
        <button
          type="button"
          onClick={handleClickConfirmButton}
        >
          确认
        </button>
        <button type="button" onClick={() => hideAddTodoBar()}>
          返回
        </button>
      </div>
    </div>
  );
};

export default AddTodoBar;
