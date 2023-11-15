import { createAsyncThunk,  createEntityAdapter,  createSlice } from "@reduxjs/toolkit";
import { Comment, CommentRequest } from "../models/Comment";
import { RootState } from "./configureStore";
import { Result } from "../models/Result";
import agent from "../api/agent";

interface CommentState {
  comments : Comment[] | null;
  commentsLoaded : boolean
};

export const getCommentByContentId = createAsyncThunk<Result<Comment[]>, string>(
  "comment/getCommentByContentId",
  async (contentId, thunkAPI) => {
    try {
      return await agent.Comment.getCommentByContentId(contentId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  });

export const createComment = createAsyncThunk<Result<Comment>, CommentRequest>(
    "comment/createComment",
    async (data, thunkAPI) => {
      try {
        return await agent.Comment.create(data);
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    });

const commentsAdapter = createEntityAdapter<Comment>();

export const commentSlice = createSlice({
    name : 'comment',
    initialState : commentsAdapter.getInitialState<CommentState>({
      comments : null,
      commentsLoaded : false
    }) ,
    reducers : {
      reset : (state) =>{
        state.comments = null;
        state.commentsLoaded = false;
      }
    } ,
    extraReducers : builder => {
      builder.addCase(getCommentByContentId.fulfilled , (state, action) => {
        const { success , data } = action.payload;
        if(success){
          commentsAdapter.setAll(state , data);
          state.commentsLoaded = true;
        };
      })
      builder.addCase(createComment.fulfilled , (state, action) => {
        const { success } = action.payload;
        if(success) state.commentsLoaded = false;
      })
    },
});

export const { reset } = commentSlice.actions;

export const commentSelectors = commentsAdapter.getSelectors((state: RootState) => state.comment); 
