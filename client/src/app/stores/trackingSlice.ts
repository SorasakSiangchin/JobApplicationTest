import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../api/agent";
import { Result } from "../models/Result";
import { RootState } from "./configureStore";
import { Tracking } from "../models/Tracking";

interface TrackingState {
    trackings: Tracking[] | null;
    trackingsLoaded: boolean;
    trackingCheck :boolean;
}

export const getTrackings = createAsyncThunk<Result<Tracking[]>>(
    'tracking/getTrackings',
    async (_, thunkAPI) => {
        try {
            const result: Result<Tracking[]> = await agent.Tracking.getAllTracking();
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });
    export const getSinglyTracking = createAsyncThunk<Result<Tracking> , any>(
        'tracking/getSinglyTracking',
        async (data , thunkAPI) => {
            try {
                
                const result: Result<Tracking> = 
                    await agent.Tracking.getSinglyTracking(data.accountId , data.friendId);
                return result;
            } catch (error: any) {
                return thunkAPI.rejectWithValue({ error: error.data });
            }
        });

export const follow = createAsyncThunk<Result<Tracking>, any>(
    'tracking/follow',
    async (data, thunkAPI) => {
        try {
            const result: Result<Tracking> = await agent.Tracking.follow(data);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

export const unFollow = createAsyncThunk<Result<Tracking>, any>(
    'tracking/unFollow',
    async (data, thunkAPI) => {
        try {
            const result: Result<Tracking> = await agent.Tracking.unFollow(data);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });

const trackingsAdapter = createEntityAdapter<Tracking>();

export const trackingSlice = createSlice({
    name: 'tracking',
    initialState: trackingsAdapter.getInitialState<TrackingState>({
        trackings: null,
        trackingsLoaded: false ,
        trackingCheck : false
    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTrackings.fulfilled, (state, action) => {
            const { data, success } = action.payload;
            if (success) {
                trackingsAdapter.setAll(state, data);
                state.trackingsLoaded = true;
            };
        });

        builder.addCase(follow.fulfilled, (state, action) => {
            const { success } = action.payload;
            if(success) state.trackingCheck = true;
        });

        builder.addCase(unFollow.fulfilled, (state, action) => {
            const { success } = action.payload;
            if(success) state.trackingCheck = true;
        });

        builder.addCase(getSinglyTracking.fulfilled, (state, action) => {
         
        });
    },
});

export const { } = trackingSlice.actions;

export const trackingSelectors = trackingsAdapter.getSelectors((state: RootState) => state.tracking);


