import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import ListItem from './ListItem';
import ActionBar from './ActionBar';
import EditTodoBar from './EditTodoBar';
import './Home.css';
import storage from '../utils/storage';
import { API_URL } from '../utils/config';

moment.locale('zh-cn');

const Home = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [showingGroup, setShowingGroup] = useState('all');
  const [isEditTodoBarVisible, setIsEditTodoBarVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
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

    const todoItemsFromStorage = storage.getItem('todoItems');

    // 设置从 localStorage 中读取的数据
    if (todoItemsFromStorage) setTodoItems(todoItemsFromStorage);

    // 从后端读取
    if (userId && userId !== '') {
      axios
        .post(`${API_URL}/todo/get`, {
          userId,
        })
        .then((res) => {
          if (res.data.errCode) {
            alert('请求错误');
          } else {
            const todoItemsFromDataBase = res.data.map((item) => ({
              // eslint-disable-next-line no-underscore-dangle
              id: item._id,
              content: item.content,
              createdAt: moment(item.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
              deadline: moment(item.deadline).format('YYYY-MM-DDTHH:mm:ss'),
              isCompleted: item.isCompleted,
              updatedAt: moment(item.updatedAt).format('YYYY-MM-DDTHH:mm:ss'),
            }));
            setTodoItems(todoItemsFromDataBase);
            storage.setItem('todoItems', todoItemsFromDataBase);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history, userId]);

  const handleDeleteItem = (id) => {
    axios
      .post(`${API_URL}/todo/remove`, {
        userId,
        todoId: id,
      })
      .then((res) => {
        if (res.data.errCode) {
          alert('请求错误');
        } else {
          // 数据库成功删除，前端模拟删除
          const newTodoItems = todoItems.filter((item) => item.id !== id);
          setTodoItems(newTodoItems);
          storage.setItem('todoItems', newTodoItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeIsCompleted = (item) => {
    axios
      .post(`${API_URL}/todo/edit`, {
        userId,
        todoId: item.id,
        content: item.content,
        deadline: item.deadline,
        isCompleted: !item.isCompleted,
      })
      .then((res) => {
        if (res.data.errCode) {
          alert('请求错误');
        } else {
          // 数据库成功修改，前端模拟修改
          const newTodoItems = todoItems.map((it) => {
            if (it.id === item.id) return { ...it, isCompleted: !it.isCompleted };
            return it;
          });
          setTodoItems(newTodoItems);
          storage.setItem('todoItems', newTodoItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeShowingGroup = (newGroup) => {
    setShowingGroup(newGroup);
  };

  const showEditTodoBar = () => {
    setIsEditTodoBarVisible(true);
  };

  const hideEditTodoBar = () => {
    setIsEditTodoBarVisible(false);
  };

  const handleLogout = () => {
    storage.clear();
    history.push('/login');
  };

  /** 加入新待办事项
   * item: { content, deadline }
   */
  const handleAddTodoItem = (item) => {
    const { content, deadline } = item;

    axios
      .post(`${API_URL}/todo/add`, {
        userId,
        content,
        deadline,
      })
      .then((res) => {
        if (res.data.errCode) {
          alert('请求错误');
        } else {
          // 将后端返回的新项目加入列表
          const newItem = {
            // eslint-disable-next-line no-underscore-dangle
            id: res.data._id,
            content: res.data.content,
            createdAt: moment(res.data.createdAt).format('YYYY-MM-DDTHH:mm:ss'),
            deadline: moment(res.data.deadline).format('YYYY-MM-DDTHH:mm:ss'),
            isCompleted: res.data.isCompleted,
            updatedAt: moment(res.data.updatedAt).format('YYYY-MM-DDTHH:mm:ss'),
          };
          const newTodoItems = [...todoItems, newItem];
          setTodoItems(newTodoItems);
          storage.setItem('todoItems', newTodoItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditTodoItem = (item) => {
    const { content, deadline } = item;

    axios
      .post(`${API_URL}/todo/edit`, {
        userId,
        todoId: currentItem.id,
        content,
        deadline,
        isCompleted: currentItem.isCompleted,
      })
      .then((res) => {
        if (res.data.errCode) {
          alert('请求错误');
        } else {
          // 数据库成功修改，前端模拟修改
          const newTodoItems = todoItems.map((it) => {
            if (it.id === currentItem.id) return { ...it, content, deadline };
            return it;
          });
          setTodoItems(newTodoItems);
          storage.setItem('todoItems', newTodoItems);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickAddItem = () => {
    setCurrentItem(null);
    setIsEditMode(false);
    showEditTodoBar();
  };

  const handleClickEditItem = (item) => {
    setCurrentItem(item);
    setIsEditMode(true);
    showEditTodoBar();
  };

  return (
    <div className="content-box">
      {userId && userId !== '' && (
        <div className="header-bar">
          <div style={{ marginRight: '20px', fontWeight: 'bold' }}>
            {`${username} 的 TODO LIST`}
          </div>
          <button type="button" onClick={handleLogout}>
            退出登录
          </button>
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
                handleClickEditItem={handleClickEditItem}
                handleChangeIsCompleted={handleChangeIsCompleted}
                item={item}
              />
            ))}
        </div>
        <ActionBar
          showingGroup={showingGroup}
          handleChangeShowingGroup={handleChangeShowingGroup}
          handleClickAddItem={handleClickAddItem}
        />
        {isEditTodoBarVisible && (
          <EditTodoBar
            isEditMode={isEditMode}
            currentItem={currentItem}
            hideEditTodoBar={hideEditTodoBar}
            handleAddTodoItem={handleAddTodoItem}
            handleEditTodoItem={handleEditTodoItem}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
