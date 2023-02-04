import React, { useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamesPage from './features/games/GamesPage';
import { getGames } from './features/games/gameSlice';
import { useAppDispatch } from './store/store';
import NavBar from './components/layout/NavBar';
import SingleGamePage from './features/games/SingleGamePage';
import CreateGamePage from './features/games/CreateGamePage';
import EditGamePage from './features/games/EditGamePage';
import LoginPage from './features/account/LoginPage';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from './features/account/accountSlice';
import AuthGuard from './components/guards/AuthGuard';

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getGames());
    await dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [])

  return (
    <BrowserRouter>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<GamesPage/>} />
        <Route path="/game/:id" element={<SingleGamePage/>} />
        <Route element={<AuthGuard/>}>
          <Route path="/editgame/:id" element={<EditGamePage/>} />
          <Route path="/creategame" element={<CreateGamePage/>} />
        </Route>
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
