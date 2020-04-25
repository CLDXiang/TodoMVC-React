import React, { Component } from 'react';
import ListItem from './ListItem';
import ActionBar from './ActionBar';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [
        {
          id: 0,
          content: '待办事项1',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 1,
          content: '待办事项2',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
      ],
      /**
       * allowed value: 'all', 'completed', 'uncompleted'
       */
      showingGroup: 'all',
    };
  }

  handleDeleteItem = (id) => {
    this.setState((state) => ({
      todoItems: state.todoItems.filter((item) => item.id !== id),
    }));
  };

  handleChangeIsCompleted = (id) => {
    this.setState((state) => ({
      todoItems: state.todoItems.map((item) => {
        if (item.id === id) return { ...item, isCompleted: !item.isCompleted };
        return item;
      }),
    }));
  };

  handleChangeShowingGroup = (newGroup) => {
    this.setState(() => ({
      showingGroup: newGroup,
    }));
  };

  render() {
    const { todoItems, showingGroup } = this.state;
    return (
      <div className="content-box">
        <div>
          {todoItems
            .filter((item) => {
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
            })
            .map((item) => (
              <ListItem
                key={item.id}
                handleDeleteItem={this.handleDeleteItem}
                handleChangeIsCompleted={this.handleChangeIsCompleted}
                item={item}
              />
            ))}
        </div>
        <ActionBar
          showingGroup={showingGroup}
          handleChangeShowingGroup={this.handleChangeShowingGroup}
        />
      </div>
    );
  }
}

export default Home;
