import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface List {
  id: number;
  name: string;
}

export interface IStateTag {
  List: List[];
  loading: boolean;
  error: null | string;
}

const initialState: IStateTag = {
  List: [{id:1, name: 'tag1'},{id:2, name: 'tag2'},{id:3, name: 'tag3'}],
  loading: false,
  error: null,
};



export const tag = createAsyncThunk('tag/tag', async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}tag/list`); // ici on fait une requête POST vers l'API

  return data;
});

const tagReducer = createReducer(initialState, (builder) => {
  builder.addCase(tag.pending, (state) => {
    state.error = null;
    state.loading = true;
  });
  builder.addCase(tag.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.List = action.payload;
  });
  builder.addCase(tag.rejected, (state) => {
    state.loading = false;
    state.error = 'Error';
  });
});

export default tagReducer;
