import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './app/login/Login';
import Homepage from './app/home/HomePage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router> 
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route path="/home" element={<Homepage/>} />
      <Route path="*" element={<p>Path not resolved</p>} />
    </Routes>
  </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
