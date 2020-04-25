import React, { Component } from 'react';
import ListItem from './ListItem';
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

  render() {
    const { todoItems } = this.state;
    return (
      <div className="content-box">
        <div>
          {todoItems.map((item) => (
            <ListItem
              key={item.id}
              handleDeleteItem={this.handleDeleteItem}
              handleChangeIsCompleted={this.handleChangeIsCompleted}
              item={item}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
