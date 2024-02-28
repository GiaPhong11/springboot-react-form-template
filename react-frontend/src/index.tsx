import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from './userList/userList';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import FormComponent from './component/FormComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <React.StrictMode>
      <ConfigProvider theme={{ hashed: false }}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/addEmployee" element={<FormComponent />} />
          <Route path="/addEmployee/:id" element={<FormComponent />} />
        </Routes>
      </ConfigProvider>
    </React.StrictMode>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
