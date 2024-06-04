import axios from 'axios';
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

interface List {
  id: number;
  name: string;
}

export interface IStateCategory {
  List: List[];
  loading: boolean;
  error: null | string;
}

const initialState: IStateCategory = {
  List: [],
  loading: false,
  error: null,
};

export const category = createAsyncThunk('category/category', async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}category/list`
  ); // ici on fait une requête POST vers l'API

  return data;
});

const categoryReducer = createReducer(initialState, (builder) => {
  builder.addCase(category.pending, (state) => {
    state.error = null;
    state.loading = true;
  });
  builder.addCase(category.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.List = action.payload;
  });
  builder.addCase(category.rejected, (state) => {
    state.loading = false;
    state.error = 'Error';
  });
});

export default categoryReducer;


