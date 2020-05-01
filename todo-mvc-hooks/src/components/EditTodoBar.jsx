/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import './EditTodoBar.css';

const EditTodoBar = (props) => {
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState('');
  const {
    hideEditTodoBar,
    handleAddTodoItem,
    handleEditTodoItem,
    isEditMode,
    currentItem,
  } = props;

  useEffect(() => {
    if (isEditMode) {
      setContent(currentItem.content);
      setDeadline(currentItem.deadline);
    }
  }, [currentItem, isEditMode]);

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
    if (isEditMode) {
      handleEditTodoItem({ content, deadline });
    } else {
      handleAddTodoItem({ content, deadline });
    }
    hideEditTodoBar();
  };

  return (
    <div className="edit-todo-bar">
      <div className="edit-todo-bar__form">
        <div className="edit-todo-bar__form-item">
          内容：
          <input type="text" value={content} onChange={onContentChange} />
        </div>
        <div className="edit-todo-bar__form-item">
          截止时间：
          <input
            type="datetime-local"
            value={deadline}
            onChange={onDeadlineChange}
          />
        </div>
      </div>
      <div className="edit-todo-bar__actions">
        <button type="button" onClick={handleClickConfirmButton}>
          确认
        </button>
        <button type="button" onClick={() => hideEditTodoBar()}>
          返回
        </button>
      </div>
    </div>
  );
};

export default EditTodoBar;
