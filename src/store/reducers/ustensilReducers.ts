import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface List {
  id: number;
  name: string;
  
}

export interface IStateUstensil {
  List: List[];
  loading: boolean;
  error: null | string;
}

const initialState: IStateUstensil = {
  List: [{id:1, name: 'ustencile1'},{id:2, name: 'ustencile2'},{id:3, name: 'ustencile3'}],
  loading: false,
  error: null,
  
};

export const ustensil = createAsyncThunk('ustensil/ustensil', async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}ustensil/list`
  ); // ici on fait une requête POST vers l'API

  return data;
});

const ustensilReducer = createReducer(initialState, (builder) => {
  builder.addCase(ustensil.pending, (state) => {
    state.error = null;
    state.loading = true;
  });
  builder.addCase(ustensil.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.List = action.payload;
  });
  builder.addCase(ustensil.rejected, (state) => {
    state.loading = false;
    state.error = 'Error';
  });
});

export default ustensilReducer;
