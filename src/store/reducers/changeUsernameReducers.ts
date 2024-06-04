import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';


export interface IStateUsername {
  credentials: {
    
    username: string;
  };
  loading: boolean;
  error: null | string;
}

const initialState: IStateUsername = {
  credentials: {
  
    username: '',
  },
  loading: false,
  error: null,
};

export const changeUsernameValue = createAction<{
  stateRegisterToChange: string;
  value: string;
}>('password/changeUsernameValue');



export const changeUsername = createAsyncThunk(
  'username/changeUsername',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}user/edit/name`,
      state.changeUsername.credentials
    );

    return data;
  }
);

const changeUsernameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeUsernameValue, (state, action) => {
      const { stateUsernameToChange, value } = action.payload;
      state.credentials[stateUsernameToChange] = value;
    })
    .addCase(changeUsername.pending, (state) => {
      state.error = null;
      state.loading = true;
    })
    .addCase(changeUsername.fulfilled, (state, action) => {
     

     
      state.loading = false;
      
     
      // on repasse les champs du formulaire à vide
     
      state.credentials.username = '';
      
     console.log('PASSWORD fulfilled... ' , action);
     
      
    })
    .addCase(changeUsername.rejected, (state, action) => {
      console.log('PASSWORD rejected... ');
      state.loading = false;
      state.error = action.error.message as string;
      console.log('error', action);
      
     
      
    });
});

export default changeUsernameReducer;
