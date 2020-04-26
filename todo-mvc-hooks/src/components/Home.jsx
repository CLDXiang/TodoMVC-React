import React, { Component } from 'react';
import moment from 'moment';
import ListItem from './ListItem';
import ActionBar from './ActionBar';
import AddTodoBar from './AddTodoBar';
import './Home.css';
import storage from '../utils/storage';

moment.locale('zh-cn');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      nextId: 0,
      /**
       * allowed value: 'all', 'completed', 'uncompleted'
       */
      showingGroup: 'all',

      isAddTodoBarVisible: false,
    };
  }

  componentDidMount() {
    /**
     * 仅用作测试，在没有 localStorage 的时候加载这个
     */
    const testState = {
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
        {
          id: 3,
          content: '待办事项3',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 4,
          content: '待办事项4',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
        {
          id: 5,
          content: '待办事项5',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 6,
          content: '待办事项6',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
        {
          id: 7,
          content: '待办事项7',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 8,
          content: '待办事项8',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
        {
          id: 9,
          content: '待办事项9',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 10,
          content: '待办事项10',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
        {
          id: 11,
          content: '待办事项11',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 12,
          content: '待办事项12',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
        {
          id: 13,
          content: '待办事项13',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 14,
          content: '待办事项14',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
        {
          id: 15,
          content: '待办事项15',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: false,
        },
        {
          id: 16,
          content: '待办事项16',
          createdAt: '2020/4/20 13:41:12',
          deadLine: '2020/4/20 13:41:13',
          isCompleted: true,
        },
      ],
      nextId: 17,
    };

    const todoItems = storage.getItem('todoItems');
    const nextId = storage.getItem('nextId');
    if (!todoItems || !nextId) {
      storage.clear();
      this.setState(() => ({
        ...testState,
      }));
      return;
    }

    // 设置从 localStorage 中读取的数据
    this.setState(() => ({
      todoItems,
      nextId,
    }));
  }

  handleDeleteItem = (id) => {
    const { todoItems, nextId } = this.state;
    const newTodoItems = todoItems.filter((item) => item.id !== id);
    this.setState(() => ({
      todoItems: newTodoItems,
    }));
    storage.setItem('todoItems', newTodoItems);
    storage.setItem('nextId', nextId);
  };

  handleChangeIsCompleted = (id) => {
    const { todoItems, nextId } = this.state;
    const newTodoItems = todoItems.map((item) => {
      if (item.id === id) return { ...item, isCompleted: !item.isCompleted };
      return item;
    });
    this.setState(() => ({
      todoItems: newTodoItems,
    }));
    storage.setItem('todoItems', newTodoItems);
    storage.setItem('nextId', nextId);
  };

  handleChangeShowingGroup = (newGroup) => {
    this.setState(() => ({
      showingGroup: newGroup,
    }));
  };

  showAddTodoBar = () => {
    this.setState(() => ({
      isAddTodoBarVisible: true,
    }));
  };

  hideAddTodoBar = () => {
    this.setState(() => ({
      isAddTodoBarVisible: false,
    }));
  };

  /** 加入新待办事项
   * item: { content, deadLine }
   */
  handleAddTodoItem = (item) => {
    const { todoItems, nextId } = this.state;
    const newTodoItems = [
      ...todoItems,
      {
        content: item.content,
        deadLine: moment(item.deadLine).format('YYYY/M/D HH:mm:ss'),
        id: nextId,
        createdAt: moment().format('YYYY/M/D HH:mm:ss'),
        isCompleted: false,
      },
    ];

    this.setState(() => ({
      todoItems: newTodoItems,
      nextId: nextId + 1,
    }));
    storage.setItem('todoItems', newTodoItems);
    storage.setItem('nextId', nextId + 1);
  };

  render() {
    const { todoItems, showingGroup, isAddTodoBarVisible } = this.state;
    console.log(todoItems);
    return (
      <div className="content-box">
        <div className="item-list">
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
          showAddTodoBar={this.showAddTodoBar}
        />
        {isAddTodoBarVisible && (
          <AddTodoBar
            hideAddTodoBar={this.hideAddTodoBar}
            handleAddTodoItem={this.handleAddTodoItem}
          />
        )}
      </div>
    );
  }
}

export default Home;
