import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import ListItem from './ListItem';
import ActionBar from './ActionBar';
import AddTodoBar from './AddTodoBar';
import './Home.css';
import storage from '../utils/storage';

moment.locale('zh-cn');

const Home = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [showingGroup, setShowingGroup] = useState('all');
  const [isAddTodoBarVisible, setIsAddTodoBarVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const history = useHistory();

  useEffect(() => {
    const userIdFromStorage = storage.getItem('userId');
    const usernameFromStorage = storage.getItem('username');
    if (!userIdFromStorage || userIdFromStorage === '') {
      history.push('/login');
    }
    setUsername(usernameFromStorage);
    setUserId(userIdFromStorage);
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

    const todoItemsFromStorage = storage.getItem('todoItems');
    const nextIdFromStorage = storage.getItem('nextId');
    if (!todoItemsFromStorage || !nextIdFromStorage) {
      storage.clear();
      setTodoItems(testState.todoItems);
      setNextId(testState.nextId);
      return;
    }

    // 设置从 localStorage 中读取的数据
    setTodoItems(todoItemsFromStorage);
    setNextId(nextIdFromStorage);
  }, [history]);

  const handleDeleteItem = (id) => {
    const newTodoItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(newTodoItems);
    storage.setItem('todoItems', newTodoItems);
    storage.setItem('nextId', nextId);
  };

  const handleChangeIsCompleted = (id) => {
    const newTodoItems = todoItems.map((item) => {
      if (item.id === id) return { ...item, isCompleted: !item.isCompleted };
      return item;
    });
    setTodoItems(newTodoItems);
    storage.setItem('todoItems', newTodoItems);
    storage.setItem('nextId', nextId);
  };

  const handleChangeShowingGroup = (newGroup) => {
    setShowingGroup(newGroup);
  };

  const showAddTodoBar = () => {
    setIsAddTodoBarVisible(true);
  };

  const hideAddTodoBar = () => {
    setIsAddTodoBarVisible(false);
  };

  const handleLogout = () => {
    storage.clear();
    history.push('/login');
  };

  /** 加入新待办事项
   * item: { content, deadLine }
   */
  const handleAddTodoItem = (item) => {
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

    setTodoItems(newTodoItems);
    setNextId(nextId + 1);
    storage.setItem('todoItems', newTodoItems);
    storage.setItem('nextId', nextId + 1);
  };

  return (
    <div className="content-box">
      { userId && userId !== '' && (
      <div className="header-bar">
        <div style={{ marginRight: '20px', fontWeight: 'bold' }}>{`${username} 的 TODO LIST`}</div>
        <button type="button" onClick={handleLogout}>退出登录</button>
      </div>
      )}
      <div className="center-box">
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
    </div>

  );
};

export default Home;
