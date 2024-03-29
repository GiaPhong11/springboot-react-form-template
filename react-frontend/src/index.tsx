import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from './components/userList/index';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import UserManagement from './components/userManagement/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
      <ConfigProvider theme={{ hashed: false }}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/add" element={<UserManagement />} />
          <Route path="/edit/:id" element={<UserManagement />} />
        </Routes>
      </ConfigProvider>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
