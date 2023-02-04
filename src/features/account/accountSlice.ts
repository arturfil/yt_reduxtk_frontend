import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { User } from "../../interfaces/User";

interface AccountState {
    loading: boolean;
    user: User | null;
    isLoggedIn: boolean;
    errors: Error[] | any;
}

const initialState: AccountState = {
    loading: false,
    user: null,
    isLoggedIn: false,
    errors: []
}

export const singupUser = createAsyncThunk<User|any, Object>(
    "account/signupUser",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", data);
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
);

export const loginUser = createAsyncThunk<User, string|Object>(
    "account/loginUser",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", data);
            const {token} = response.data;
            localStorage.setItem("jwt_youtube_soccer", JSON.stringify(token));
            toast.success("Successfully Logged In");
            thunkAPI.dispatch(setLoggedIn(true));
            return token;
        } catch (error) {
            return thunkAPI.rejectWithValue({error});
        }
    }
);

export const getCurrentUser = createAsyncThunk<void>(
    "account/getCurrentUser",
    async (_, thunkAPI) => {
        try {
            // getting token from local storage
            const token = JSON.parse(localStorage.getItem("jwt_youtube_soccer")!);
            if (!token) {
                thunkAPI.dispatch(setLoggedIn(false));
                return;
            }
            const response = await axios.get("http://localhost:8080/api/auth/currentUser", {headers: {
                "Authorization": token
            }})
            if (response.data.username) {
                thunkAPI.dispatch(setLoggedIn(true));
                return;
            } else {
                thunkAPI.dispatch(setLoggedIn(false));
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }
)

export const logOutUser = createAsyncThunk<void>(
    "account/logOutUser",
    async (_, thunkAPI) => {
        try {
            localStorage.removeItem("jwt_youtube_soccer");
            thunkAPI.dispatch(setLoggedIn(false));
            toast.info("Successfully Logged Out");
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.errors.data);
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
    }
});

export const { setLoggedIn } = accountSlice.actions;
export default accountSlice.reducer;