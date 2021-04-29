import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './css/common/_reset.css';
import './css/common/common.css';
import './css/lib/bootstrap.min.css'
import './css/main/main.css';
import './css/map/map.css';
import './css/sell/sell.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import './css/lib/react-bootstrap-range-slider.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
