import React, { useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GamesPage from './features/games/GamesPage';
import { getGames } from './features/games/gameSlice';
import { useAppDispatch } from './store/store';
import NavBar from './components/NavBar';

function App() {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [])

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<GamesPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
