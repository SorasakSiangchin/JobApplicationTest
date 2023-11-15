import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Account, Login, Register } from "../models/Account";
import agent from "../api/agent";
import { Result } from "../models/Result";

interface AccountState {
    account: Account | null;
    friends: Account[] | null;
    friendsLoaded: boolean;
};
const initialState: AccountState = {
    account: null,
    friends: null ,
    friendsLoaded : false
};

export const login = createAsyncThunk<Result<Account>, Login>(
    'account/login',
    async (data, thunkAPI) => {
        try {
            const result: Result<Account> = await agent.Account.login(data);
            thunkAPI.dispatch(setAccountInLocal(result.data));
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const register = createAsyncThunk<Result<Account>, Register>(
    'account/register',
    async (data, thunkAPI) => {
        try {
            return await agent.Account.register(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

export const getFriends = createAsyncThunk<Result<Account[]>>(
    'account/getFriends',
    async (_, thunkAPI) => {
        const account: Account = JSON.parse(localStorage.getItem('account')!);
        try {
            return await agent.Account.getFriends(account.id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

export const searchName = createAsyncThunk<Result<Account[]> , string>(
    'account/searchName',
    async (data, thunkAPI) => {
        try {
            return await agent.Account.searchName(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

export const getCurrentAccount = createAsyncThunk<Result<Account>>(
    'account/getCurrentAccount',
    async (_, thunkAPI) => {
        const account: Account = JSON.parse(localStorage.getItem('account')!);
        try {
            const result: Result<Account> = await agent.Account.getAccountById(account.id);
            thunkAPI.dispatch(setAccount(result.data));
            localStorage.setItem('account', JSON.stringify(result.data));
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        };
    },
    {
        condition: () => {
            if (!localStorage.getItem('account')) return false;
        }
    }
);

export const getAccountById = createAsyncThunk<Result<Account>, number>(
    'account/getAccountById',
    async (accountId, thunkAPI) => {
        try {
            const result: Result<Account> = await agent.Account.getAccountById(accountId);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        };
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccountInLocal: (_, action) => {
            localStorage.setItem(
                "account",
                JSON.stringify(action.payload)
            );
        },
        logout: (state) => {
            state.account = null;
            localStorage.removeItem("account");
        },
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        resetFriends : (state) => {
            state.friendsLoaded = false;
            state.friends = [];
        }
    },
    extraReducers: (builder => {
        builder.addCase((login.fulfilled), (state, action) => {
            const { data, success } = action.payload;
            if (success) state.account = data;
        });
        builder.addCase((getFriends.fulfilled), (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.friends = data;
                state.friendsLoaded = true;
            }
        });
        builder.addCase((searchName.fulfilled), (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                state.friends = data;
                state.friendsLoaded = true;
            }
        });
    })
});

export const { setAccountInLocal, logout, setAccount , resetFriends} = accountSlice.actions;
