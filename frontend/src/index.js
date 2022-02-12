import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import axios from 'axios'

let token = localStorage.getItem("token")
if(token) axios.defaults.headers.common['Authorization'] = token
else delete axios.defaults.headers.common['Authorization']

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);