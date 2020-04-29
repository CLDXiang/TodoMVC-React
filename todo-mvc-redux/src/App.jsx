import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducers/index';
import HomeContainer from './containers/HomeContainer';
import './App.css';

const store = createStore(appReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <HomeContainer />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
