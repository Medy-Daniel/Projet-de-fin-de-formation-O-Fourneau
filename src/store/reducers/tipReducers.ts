import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface List {
  title: String;
  id: number;
  content: string;
  picture: string;
  slug: string | null;
}

export interface IStateTip {
  List: List[];
  randomTip: List | null;
  loading: boolean;
  error: null | string;
}

const initialState: IStateTip = {
  List: [],
  randomTip: null,
  loading: false,
  error: null,
};

export const tip = createAsyncThunk('tip/tip', async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}tip/list`); // ici on fait une requête POST vers l'API
  return data;
});

export const getRandomTip = createAsyncThunk('tip/getRandomTip', async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}tip/random`);
  return data;
});

const tipReducer = createReducer(initialState, (builder) => {
  builder.addCase(tip.pending, (state) => {
    state.error = null;
    state.loading = true;
  })
  .addCase(tip.fulfilled, (state, action) => {
    state.loading = false;
    state.error = null;
    state.List = action.payload;
  })
  .addCase(tip.rejected, (state) => {
    state.loading = false;
    state.error = 'Error';
  })
  .addCase(getRandomTip.pending, (state) => {
    state.error = '';
    state.loading = true;
  })
  .addCase(getRandomTip.fulfilled, (state, action) => {
    state.randomTip = action.payload;
    state.loading = false;
  })
  .addCase(getRandomTip.rejected, (state) => {
    // state.error = action.payload
    state.error = "une erreur s'est produite lors du chargement de la page"
    state.loading = false;
  });
});

export default tipReducer;
