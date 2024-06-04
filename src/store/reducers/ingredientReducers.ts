import { createReducer, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface List {
  id: number;
  name: string;
  unit: string;
}

export interface IStateIngredient {
  List: List[];
  loading: boolean;
  error: null | string;
}

const initialState: IStateIngredient = {
  List: [],
  loading: false,
  error: null,
};



export const ingredient = createAsyncThunk(
  'ingredient/ingredient',
  async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}ingredient/list`
    ); // ici on fait une requête POST vers l'API

    return data;
  }
);

const ingredientReducer = createReducer(initialState, (builder) => {
  builder
 
  .addCase(ingredient.pending, (state) => {
    state.error = null;
    state.loading = true;
  });
  builder.addCase(ingredient.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.List = action.payload;
  });
  builder.addCase(ingredient.rejected, (state) => {
    state.loading = false;
    state.error = 'Error';
  });
});

export default ingredientReducer;
