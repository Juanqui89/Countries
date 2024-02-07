import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './View/Home.tsx';
import './assets/CSS/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
