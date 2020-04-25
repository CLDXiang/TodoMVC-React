import React from 'react';
import './ActionBar.css';

const ActionBar = (props) => {
  const { showingGroup, handleChangeShowingGroup, showAddTodoBar } = props;

  return (
    <div className="action-bar">
      <select
        value={showingGroup}
        onChange={(e) => handleChangeShowingGroup(e.target.value)}
      >
        <option value="all">显示全部</option>
        <option value="completed">仅显示已完成</option>
        <option value="uncompleted">仅显示未完成</option>
      </select>
      <button type="button" onClick={() => showAddTodoBar()}>
        增加待办事项
      </button>
    </div>
  );
};

export default ActionBar;
