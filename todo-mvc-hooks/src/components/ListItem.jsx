import React from 'react';
import moment from 'moment';
import './ListItem.css';

moment.locale('zh-cn');

const ListItem = (props) => {
  const {
    item, handleDeleteItem, handleChangeIsCompleted, handleClickEditItem,
  } = props;
  const {
    id, content, createdAt, deadline, isCompleted,
  } = item;

  return (
    <div className="list-item">
      <div
        className="list-item__content"
        onClick={() => handleChangeIsCompleted(item)}
      >
        <span
          className={isCompleted ? 'content__line content__line--completed' : 'content__line'}
        >
          {content}
        </span>
        <span className="content__line">
          <span className="content__time">
            开始时间：
            {moment(createdAt).format('YYYY/M/D HH:mm:ss')}
          </span>
          <span className="content__time">
            截止时间：
            {moment(deadline).format('YYYY/M/D HH:mm:ss')}
          </span>
        </span>
      </div>
      <div className="list-item__actions">
        <button type="button" onClick={() => handleClickEditItem(item)}>
          编辑
        </button>
        <button type="button" onClick={() => handleDeleteItem(id)}>
          删除
        </button>
      </div>
    </div>
  );
};

export default ListItem;
