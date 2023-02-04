import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import gameReducer from '../features/games/gameSlice';
import accountReducer from '../features/account/accountSlice';

export const store = configureStore({
    reducer: {
        games: gameReducer,
        account: accountReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;