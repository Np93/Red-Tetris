import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Home from './pages/Home';
import Game from './pages/Game';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobby/:roomId/:username" element={<Lobby />} />
      <Route path="/game/:roomId/:username" element={<Game />} />
    </Routes>
  </BrowserRouter>
);