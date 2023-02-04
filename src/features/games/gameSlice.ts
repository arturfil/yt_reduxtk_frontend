import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Game } from "../../interfaces/Game";

interface GameState {
    games: Game[] | null;
    loading: boolean; 
    singleGame: Game | null;
    errors:any;
}

const initialState: GameState = {
    games: [],
    singleGame: null,
    loading: false,
    errors: null
}

// actions are processes that get data from backend
export const getGames = createAsyncThunk<Game[]>(
    "games/getGames",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:8080/api/games");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getGameById = createAsyncThunk<Game, string>(
    "games/getGameById",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/games/game/${id}`)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createGame = createAsyncThunk<Game, Object>(
    "games/createGame",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/games/game", data);
            thunkAPI.dispatch(getGames());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateGame = createAsyncThunk<Game, Object|any>(
    "games/updateGame",
    async (data, thunkAPI) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/games/game/${data._id}`, data)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteGame = createAsyncThunk<string,string>(
    "games/deleteGame",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/games/game/${id}`);
            thunkAPI.dispatch(getGames());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
) 

// reducers -> reduce to a specific state -> changes state
export const gameSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<Game[]>) => {
            state.games = action.payload
        },
        filterGame: (state, action) => {
            state.games = state.games?.filter(game => game._id !== action.payload)!;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getGames.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getGames.fulfilled, (state, action) => {
            state.games = action.payload;
            state.loading = false;
        });
        builder.addCase(getGames.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
        builder.addCase(getGameById.pending, (state) => {
            state.loading = true;            
        });
        builder.addCase(getGameById.fulfilled, (state, action) => {
            state.singleGame = action.payload;
            state.loading = false;
        });
        builder.addCase(updateGame.fulfilled, (state, action) => { 
            state.singleGame = action.payload;
        });
        // builder.addCase(deleteGame.fulfilled, (state, action) => {
        //     state.message
        // })
    }
})

export default gameSlice.reducer;
export const { setGames, filterGame } = gameSlice.actions;