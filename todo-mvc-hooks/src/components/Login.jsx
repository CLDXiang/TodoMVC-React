import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import storage from '../utils/storage';
import { API_URL } from '../utils/config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = () => {
    if (username === '') {
      alert('用户名不能为空！');
      return;
    }
    if (password === '') {
      alert('密码不能为空！');
      return;
    }
    setIsLoading(true);
    axios
      .post(`${API_URL}/user/login`, {
        username,
        password,
      })
      .then((res) => {
        if (!res.data.success) {
          switch (res.data.errCode) {
            case 3:
              alert('用户不存在');
              break;
            case 4:
              alert('密码错误');
              break;
            default:
              alert('请求错误');
          }
        } else {
          const { id } = res.data;
          storage.setItem('userId', id);
          history.push('/');
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onRegister = () => {};

  return (
    <div className="login-bar">
      <div className="login-bar__line">
        用户名：
        <input
          type="text"
          value={username}
          disabled={isLoading}
          onChange={onUsernameChange}
        />
      </div>
      <div className="login-bar__line">
        密码：
        <input
          type="password"
          value={password}
          disabled={isLoading}
          onChange={onPasswordChange}
        />
      </div>
      <div className="login-bar__line">
        <button type="button" onClick={onLogin} disabled={isLoading}>
          登录
        </button>
        <button type="button" onClick={onRegister} disabled={isLoading}>
          注册
        </button>
      </div>
    </div>
  );
};

export default Login;
