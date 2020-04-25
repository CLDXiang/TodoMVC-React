import React from 'react';
import './ListItem.css';

const ListItem = (props) => {
  const { item, handleDeleteItem, handleChangeIsCompleted } = props;
  const { id, content, createdAt, deadLine, isCompleted } = item;

  return (
    <div className="list-item">
      <div
        className="list-item__content"
        onClick={() => handleChangeIsCompleted(id)}
      >
        <span
          className={isCompleted ? 'content__line--completed' : 'content__line'}
        >
          {content}
        </span>
        <span className="content__line">
          <span className="content__time">{createdAt}</span>
          <span className="content__time">{deadLine}</span>
        </span>
      </div>
      <div className="list-item__actions">
        <button type="button" onClick={() => handleDeleteItem(id)}>
          删除
        </button>
      </div>
    </div>
  );
};

export default ListItem;
