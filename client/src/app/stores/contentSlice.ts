import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Content, ContentRequest } from "../models/Content";
import { RootState } from './configureStore';
import { Result } from "../models/Result";
import { Account } from "../models/Account";

interface ContentState {
    contents : Content[] | null;
    contentsLoaded : boolean
}

export const getFriendContents = createAsyncThunk<Result<Content[]>, void , { state: RootState }>("content/getFriendContents" , 
    async (_, thunkAPI) => {
    const account : Account = JSON.parse(localStorage.getItem('account')!);
    try {
        return await agent.Content.getFriendContents(account.id);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const createContent = createAsyncThunk<Result<Content[]>, ContentRequest>("content/createContent" , 
    async (data, thunkAPI) => {

    try {
        return await agent.Content.create(data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

const contentsAdapter = createEntityAdapter<Content>();

export const contentSlice = createSlice({
    name: "content",
    initialState: contentsAdapter.getInitialState<ContentState>({
        contents : null ,
        contentsLoaded : false
    }),
    reducers: {
      reset : (state) => {
        state.contentsLoaded = false;
      }
    },
    extraReducers: (builder => {
        builder.addCase(getFriendContents.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                contentsAdapter.setAll(state, data);
                state.contentsLoaded = true;
            };
        });

        builder.addCase(createContent.fulfilled, (state, action) => {
            const { success } = action.payload;
            if (success) {
                state.contentsLoaded = false;
            };
        })
    })
});

export const { reset } = contentSlice.actions;

export const contentSelectors = contentsAdapter.getSelectors((state: RootState) => state.content); 
