import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import Error from './pages/Error';
import Home from './pages/Home'
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Provider } from 'react-redux';
import store from './utils/store';
import PrivateRoutes from './utils/PrivateRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/error" element={<Error />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
