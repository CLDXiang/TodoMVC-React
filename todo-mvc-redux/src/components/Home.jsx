import React from 'react';
import moment from 'moment';
import ListItem from './ListItem';
import ActionBar from './ActionBar';
import AddTodoBar from './AddTodoBar';
import './Home.css';

moment.locale('zh-cn');

const Home = (props) => {
  const {
    visibleTodoItems,
    showingGroup,
    isAddTodoBarVisible,
    handleAddTodoItem,
    handleDeleteItem,
    handleChangeIsCompleted,
    handleChangeShowingGroup,
    showAddTodoBar,
    hideAddTodoBar,
  } = props;
  return (
    <div className="content-box">
      <div className="item-list">
        {visibleTodoItems.map((item) => (
          <ListItem
            key={item.id}
            handleDeleteItem={handleDeleteItem}
            handleChangeIsCompleted={handleChangeIsCompleted}
            item={item}
          />
        ))}
      </div>
      <ActionBar
        showingGroup={showingGroup}
        handleChangeShowingGroup={handleChangeShowingGroup}
        showAddTodoBar={showAddTodoBar}
      />
      {isAddTodoBarVisible && (
        <AddTodoBar
          hideAddTodoBar={hideAddTodoBar}
          handleAddTodoItem={handleAddTodoItem}
        />
      )}
    </div>
  );
};

export default Home;
